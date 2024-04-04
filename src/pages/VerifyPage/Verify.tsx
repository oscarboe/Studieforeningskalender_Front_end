import './Verify.scss';
import { useMutation } from '@apollo/client';
import {
	ResendForgotPasswordVerificationEmailMutation,
	ResendForgotPasswordVerificationEmailMutationVariables,
	VerifyUserMutation,
	VerifyUserMutationVariables,
} from '../../../generated/graphql/graphql';
import { RESEND_FORGOT_PASSWORD_VERIFICATION_CODE } from '../../Queries/EmailQueries';
import { HandleGraphQLError, HandleGraphQLSuccess } from '../../Helpers/ResponseHelper';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useEffect } from 'react';
import { VERIFY_USER } from '../../Queries/UserQueries';
import { emptyAlerts, setAlerts } from '../../Redux/Slices/alertsSlice';

export default function Verify() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [resendVerification, { loading: resendLoading }] = useMutation<
		ResendForgotPasswordVerificationEmailMutation,
		ResendForgotPasswordVerificationEmailMutationVariables
	>(RESEND_FORGOT_PASSWORD_VERIFICATION_CODE, {
		onCompleted: (data) =>
			HandleGraphQLSuccess(data.resendRegistrationVerificationEmail, dispatch, 'sendVerificationEmail'),
		onError: (error) => HandleGraphQLError(error, dispatch),
	});

	const query = new URLSearchParams(useLocation().search);
	const email = query.get('email');
	const token = query.get('token');

	const [verifyUser, { loading: verifyLoading, error }] = useMutation<VerifyUserMutation, VerifyUserMutationVariables>(
		VERIFY_USER,
		{
			onCompleted: (data) => {
				HandleGraphQLSuccess(data.verifyUser, dispatch, 'verifyUser');
				navigate('/');
			},
			onError: (error) => HandleGraphQLError(error, dispatch),
		}
	);

	useEffect(() => {
		window.history.replaceState(null, 'Verification', '/Verify');
		if (email && token) {
			dispatch(emptyAlerts());
			verifyUser({
				variables: { verifyUserInput: { emailAddress: email, token: token } },
			});
		} else {
			dispatch(
				setAlerts([{ message: 'This page is only used for verification using a verification link', severity: 'error' }])
			);
			navigate('/');
		}
	}, []);

	if (verifyLoading)
		return (
			<div id='verify-error-page'>
				{' '}
				<Spinner />
			</div>
		);
	else if (error)
		return (
			<div id='verify-error-page'>
				{resendLoading ? (
					<Spinner />
				) : (
					<>
						<p>
							The Verification code was incorrect or has expired, press the button below to send a new verification code
						</p>
						<button
							id='resend-verification-button'
							onClick={() => {
								dispatch(emptyAlerts());
								resendVerification();
							}}
						>
							Resend verification email
						</button>
					</>
				)}
			</div>
		);
}
