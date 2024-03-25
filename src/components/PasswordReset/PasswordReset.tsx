import './PasswordReset.scss';
import Password from '../Password/Password';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidateEmailAddress, ValidatePasswordReset } from '../../Validators/UserValidators';
import Modal from '@mui/material/Modal';
import { Fade } from '@mui/material';
import { emptyAlerts, setAlerts } from '../../Redux/Slices/alertsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

interface props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

interface formProps {
	emailAddress: string;
	verificationCode: string;
	password: string;
}

export default function PasswordReset({ setOpen, open }: props) {
	const { register, handleSubmit } = useForm<formProps>();

	const alerts = useSelector((state: RootState) => state.alerts);
	const dispatch = useDispatch();

	function GetError(field: string): string {
		return alerts.find((x) => x.field === field && x.component === 'passwordReset') ? 'error' : '';
	}

	const onSubmit: SubmitHandler<formProps> = (data) => {
		dispatch(emptyAlerts());
		const errors = ValidatePasswordReset(data.verificationCode, data.password, data.emailAddress);

		if (errors.length === 0) console.log('No errors with form data');
		else dispatch(setAlerts(errors));
	};

	const onSubmitEmail: SubmitHandler<formProps> = (data) => {
		dispatch(emptyAlerts());
		var errors = ValidateEmailAddress(data.emailAddress, 'passwordReset', 'emailAddress');

		if (errors.length === 0) console.log('No errors with email');
		else dispatch(setAlerts(errors));
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
