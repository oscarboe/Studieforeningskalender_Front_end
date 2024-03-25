import './Login.scss';
import { useMutation } from '@apollo/client';
import { LOGIN_QUERY } from '../../Queries/UserQueries';
import { LoginMutation, LoginMutationVariables } from '../../../generated/graphql/graphql';
import { useNavigate } from 'react-router-dom';
import Password from '../Password/Password';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidateLoginInput } from '../../Validators/UserValidators';
import GetErrorMessage from '../../Helpers/ErrorMessages';
import { alertProps } from '../../pages/LoginPage/LoginPage';
import { useState } from 'react';
import PasswordReset from '../PasswordReset/PasswordReset';

export default function Login({ alerts, setAlerts }: alertProps) {
	const { register, handleSubmit } = useForm<LoginMutationVariables>();
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const [login] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_QUERY, {
		onCompleted: (data) => {
			if (!data.login.isSuccessful) {
				setAlerts((e) => [...e, { message: data.login.message, severity: 'error' }]);
			} else {
				setAlerts([{ message: 'User successfully logged in', severity: 'success' }]);
				navigate('/');
			}
		},
		onError: (error) => {
			setAlerts((e) => [...e, { message: GetErrorMessage(error), severity: 'error' }]);
			console.log(error.message);
		},
	});

	function GetError(field: string): string {
		return alerts.find((x) => x.field === field && x.component === 'login') ? 'error' : '';
	}

	const onSubmit: SubmitHandler<LoginMutationVariables> = (data) => {
		setAlerts([]);
		const errorArr = ValidateLoginInput(data);

		if (errorArr.length === 0) login({ variables: data });
		else setAlerts(errorArr);
	};

	return (
		<form id='login-box' onSubmit={handleSubmit(onSubmit)}>
			<h2 id='login-header'>Login</h2>
			<input placeholder='Username' className={GetError('username')} {...register('username')} />
			<Password error={GetError('password')} {...register('password')} />
			<div id='remeber-me-forgot-password'>
				<div>
					<input type='checkbox' />
					<p>Remember Me</p>
				</div>
				<a onClick={() => setOpen(true)}>Forgot Password?</a>
				<PasswordReset alerts={alerts} setAlerts={setAlerts} open={open} setOpen={setOpen} />
			</div>
			<button id='login-button' type='submit'>
				Login
			</button>
		</form>
	);
}
