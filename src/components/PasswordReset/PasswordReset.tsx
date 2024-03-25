import './PasswordReset.scss';
import Password from '../Password/Password';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	ValidateEmailAddress,
	ValidateLoginInput,
	ValidatePasswordReset,
	validationError,
} from '../../Validators/UserValidators';
import Modal from '@mui/material/Modal';
import { Fade } from '@mui/material';
import { useState } from 'react';

interface props {
	alerts: validationError[];
	setAlerts: React.Dispatch<React.SetStateAction<validationError[]>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

interface formProps {
	emailAddress: string;
	verificationCode: string;
	password: string;
}

export default function PasswordReset({ alerts, setAlerts, setOpen, open }: props) {
	const { register, handleSubmit } = useForm<formProps>();

	function GetError(field: string): string {
		return alerts.find((x) => x.field === field && x.component === 'passwordReset') ? 'error' : '';
	}

	const onSubmit: SubmitHandler<formProps> = (data) => {
		setAlerts([]);
		const errorArr = ValidatePasswordReset(data.verificationCode, data.password, data.emailAddress);

		if (errorArr.length === 0) console.log('No errors with form data');
		else setAlerts(errorArr);
	};

	const onSubmitEmail: SubmitHandler<formProps> = (data) => {
		setAlerts([]);
		var errors = ValidateEmailAddress(data.emailAddress, 'passwordReset', 'emailAddress');

		if (errors.length === 0) console.log('No errors with email');
		else setAlerts(errors);
	};

	return (
		<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition id='password-reset-modal'>
			<Fade in={open}>
				<form id='password-reset-box' onSubmit={handleSubmit(onSubmit)}>
					<div id='password-reset-text-div'>
						<h2 id='password-reset-header'>Password Reset</h2>
						<p>
							To reset this accounts password you will need access to the email associated with it. If you don't have
							access to the email you will not be able to reset its password.
						</p>
					</div>
					<div id='account-email-div'>
						<input placeholder='Account email' className={GetError('emailAddress')} {...register('emailAddress')} />
						<button onClick={handleSubmit(onSubmitEmail)}>Send Code</button>
					</div>
					<input
						placeholder='Verification code'
						className={GetError('verificationCode')}
						{...register('verificationCode')}
					/>
					<Password
						error={GetError('password')}
						className={GetError('password')}
						placeholder='New Password'
						{...register('password')}
					/>
					<button id='password-reset-button' type='submit'>
						Change Password
					</button>
				</form>
			</Fade>
		</Modal>
	);
}
