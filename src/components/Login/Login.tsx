import './Login.scss';
import { useMutation } from '@apollo/client';
import { LOGIN_QUERY } from '../../Queries/UserQueries';
import { LoginMutation, LoginMutationVariables } from '../../../generated/graphql/graphql';
import { useLocation, useNavigate } from 'react-router-dom';
import Password from '../Password/Password';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidateLoginInput } from '../../Validators/UserValidators';
import { useEffect, useState } from 'react';
import PasswordReset from '../PasswordReset/PasswordReset';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { emptyAlerts, setAlerts } from '../../Redux/Slices/alertsSlice';
import { HandleGraphQLError, HandleGraphQLSuccess } from '../../Helpers/ResponseHelper';
import Spinner from '../Spinner/Spinner';

export default function Login() {
	const { register, handleSubmit } = useForm<LoginMutationVariables>();
	const [open, setOpen] = useState(false);

	const query = new URLSearchParams(useLocation().search);
	const email = query.get('email');
	const token = query.get('token');

	const alerts = useSelector((state: RootState) => state.alerts);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_QUERY, {
		onCompleted: (data) => {
			HandleGraphQLSuccess(data.login, dispatch, 'login');
			if (data.login.isSuccessful) navigate('/');
		},
		onError: (error) => HandleGraphQLError(error, dispatch),
	});

	function GetError(field: string): string {
		return alerts.find((x) => x.field === field && x.component === 'login') ? 'error' : '';
	}

	const onSubmit: SubmitHandler<LoginMutationVariables> = (data) => {
		dispatch(emptyAlerts());
		const errorArr = ValidateLoginInput(data);

		if (errorArr.length === 0) login({ variables: data });
		else dispatch(setAlerts(errorArr));
	};

	useEffect(() => {
		if (email && token) {
			window.history.replaceState(null, 'Verification', '/Verify');
			setOpen(true);
		}
	}, [email, token]);

	return (
		<form id='login-box' onSubmit={handleSubmit(onSubmit)}>
			<h2 id='login-header'>Login</h2>
			<input placeholder='Username' className={GetError('username')} {...register('username')} />
			<Password error={GetError('password')} {...register('password')} />
			<div id='remeber-me-forgot-password'>
				<div>
					<input type='checkbox' {...register('rememberMe')} />
					<p>Remember Me</p>
				</div>
				<a onClick={() => setOpen(true)}>Forgot Password?</a>
				<PasswordReset open={open} setOpen={setOpen} emailAddress={email ?? ''} verificationToken={token ?? ''} />
			</div>
			{loading ? (
				<Spinner />
			) : (
				<button id='login-button' type='submit'>
					Login
				</button>
			)}
		</form>
	);
}
