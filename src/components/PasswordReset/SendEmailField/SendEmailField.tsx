import './SendEmailField.scss';
import { useMutation } from '@apollo/client';
import {
	ChangePasswordInput,
	SendForgotPasswordVerificationEmailMutation,
	SendForgotPasswordVerificationEmailMutationVariables,
} from '../../../../generated/graphql/graphql';
import { HandleGraphQLSuccess, HandleGraphQLError } from '../../../Helpers/ResponseHelper';
import { SEND_FORGOT_PASSWORD_VERIFICATION_CODE } from '../../../Queries/EmailQueries';
import Spinner from '../../Spinner/Spinner';
import { emptyAlerts, setAlerts } from '../../../Redux/Slices/alertsSlice';
import { ValidateEmailAddress, ValidateToken } from '../../../Validators/UserValidators';
import { useDispatch } from 'react-redux';
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { forwardRef } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';

interface props {
	handleSubmit: UseFormHandleSubmit<ChangePasswordInput, undefined>;
	error: string;
	token: string;
	reCaptchaRef: React.RefObject<ReCAPTCHA>;
}

const SendEmailField = forwardRef<HTMLInputElement, props & React.InputHTMLAttributes<HTMLInputElement>>(
	({ handleSubmit, error, token, reCaptchaRef, ...inputProps }, ref) => {
		const dispatch = useDispatch();

		const [sendVerification, { loading }] = useMutation<
			SendForgotPasswordVerificationEmailMutation,
			SendForgotPasswordVerificationEmailMutationVariables
		>(SEND_FORGOT_PASSWORD_VERIFICATION_CODE, {
			onCompleted: (data) =>
				HandleGraphQLSuccess(data.sendForgotPasswordVerificationEmail, dispatch, 'sendVerificationEmail'),
			onError: (error) => HandleGraphQLError(error, dispatch),
		});

		const onSubmitEmail: SubmitHandler<ChangePasswordInput> = async (data) => {
			dispatch(emptyAlerts());
			var errors = ValidateEmailAddress(data.emailAddress, 'passwordReset', 'emailAddress');

			if (errors.length === 0) {
				data.recaptchaToken = (await reCaptchaRef.current?.executeAsync()) ?? '';
				sendVerification({
					variables: {
						email: data.emailAddress,
						reCaptchaToken: data.recaptchaToken,
					},
				});
				reCaptchaRef.current?.reset();
			} else dispatch(setAlerts(errors));
		};

		return (
			<div id='account-email-div'>
				<input {...inputProps} ref={ref} placeholder='Account email' className={error} />
				{loading ? (
					<Spinner size='1.75rem' style={{ marginLeft: '-4rem' }} />
				) : ValidateToken(token, 'passwordReset', 'verificationCode').length === 0 ? (
					<FiCheckCircle id='email-checkmark' size={'1.75rem'} />
				) : (
					<button onClick={handleSubmit(onSubmitEmail)}>Send Code</button>
				)}
			</div>
		);
	}
);

export default SendEmailField;
