import './PasswordReset.scss';
import Password from '../Password/Password';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidatePasswordReset } from '../../Validators/UserValidators';
import Modal from '@mui/material/Modal';
import { Fade } from '@mui/material';
import { emptyAlerts, setAlerts } from '../../Redux/Slices/alertsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useMutation } from '@apollo/client';
import {
	ChangePasswordInput,
	ChangePasswordMutation,
	ChangePasswordMutationVariables,
} from '../../../generated/graphql/graphql';
import { CHANGE_PASSWORD_QUERY } from '../../Queries/UserQueries';
import { HandleGraphQLError, HandleGraphQLSuccess } from '../../Helpers/ResponseHelper';
import SendEmailField from './SendEmailField/SendEmailField';
import Spinner from '../Spinner/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';

interface props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
	emailAddress?: string;
	verificationToken?: string;
	reCaptchaRef: React.RefObject<ReCAPTCHA>;
}

export default function PasswordReset({ setOpen, open, emailAddress, verificationToken, reCaptchaRef }: props) {
	const [changePassword, { loading }] = useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
		CHANGE_PASSWORD_QUERY,
		{
			onCompleted: (data) => {
				HandleGraphQLSuccess(data.changePassword, dispatch, 'changePassword');
				if (data.changePassword.isSuccessful) setOpen(false);
			},
			onError: (error) => HandleGraphQLError(error, dispatch),
		}
	);

	const { register, handleSubmit } = useForm<ChangePasswordInput>({
		defaultValues: {
			emailAddress: emailAddress,
			verificationCode: verificationToken,
		},
	});

	const alerts = useSelector((state: RootState) => state.alerts);
	const dispatch = useDispatch();

	function GetError(field: string): string {
		return alerts.find((x) => x.field === field && x.component === 'passwordReset') ? 'error' : '';
	}

	const onSubmit: SubmitHandler<ChangePasswordInput> = async (data) => {
		dispatch(emptyAlerts());
		const errors = ValidatePasswordReset(data);

		if (errors.length === 0) {
			data.recaptchaToken = (await reCaptchaRef.current?.executeAsync()) ?? '';
			changePassword({ variables: { changePassword: data } });
			reCaptchaRef.current?.reset();
		} else dispatch(setAlerts(errors));
	};

	return (
		<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition id='password-reset-modal'>
			<Fade in={open}>
				<form
					id='password-reset-box'
					onSubmit={(e) => {
						e.stopPropagation();
						handleSubmit(onSubmit)(e);
					}}
				>
					<div id='password-reset-text-div'>
						<h2 id='password-reset-header'>Password Reset</h2>
						<p>
							To reset this accounts password you will need access to the email associated with it. If you don't have
							access to the email you will not be able to reset its password.
						</p>
					</div>
					<SendEmailField
						token={verificationToken ?? ''}
						error={GetError('emailAddress')}
						handleSubmit={handleSubmit}
						reCaptchaRef={reCaptchaRef}
						{...register('emailAddress')}
					/>
					<Password error={GetError('password')} placeholder='New Password' {...register('password')} />
					{loading ? (
						<Spinner style={{ justifyContent: 'center', width: '100%' }} />
					) : (
						<button id='password-reset-button' type='submit'>
							Change Password
						</button>
					)}
				</form>
			</Fade>
		</Modal>
	);
}
