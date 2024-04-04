import './Register.scss';
import { useMutation } from '@apollo/client';
import { REGISTER_QUERY } from '../../Queries/UserQueries';
import { CreateUserInput, CreateUserMutation, CreateUserMutationVariables } from '../../../generated/graphql/graphql';
import Password from '../Password/Password';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidateCreateUserInput } from '../../Validators/UserValidators';
import GetErrorMessage from '../../Helpers/ErrorMessages';
import { useSelector, useDispatch } from 'react-redux';
import { addAlert, emptyAlerts, setAlerts } from '../../Redux/Slices/alertsSlice';
import { RootState } from '../../Redux/store';

export interface registerInput {
	createUserInput: CreateUserInput;
	confirmPassword: string;
}

export default function Register() {
	const { register, handleSubmit } = useForm<registerInput>();

	const alerts = useSelector((state: RootState) => state.alerts);
	const dispatch = useDispatch();

	const [registerUser] = useMutation<CreateUserMutation, CreateUserMutationVariables>(REGISTER_QUERY, {
		onCompleted: (data) => {
			if (!data.createUser.isSuccessfull) dispatch(addAlert({ message: data.createUser.message, severity: 'error' }));
			else dispatch(addAlert({ message: 'User successfully registered', severity: 'success' }));
		},
		onError: (error) => {
			dispatch(addAlert({ message: GetErrorMessage(error), severity: 'error' }));
			console.log('An error occurred when registering. Error Message: ' + error);
		},
	});

	const onSubmit: SubmitHandler<registerInput> = (data) => {
		dispatch(emptyAlerts());
		const errors = ValidateCreateUserInput(data.createUserInput, data.confirmPassword);

		if (errors.length === 0) registerUser({ variables: { createUserInput: data.createUserInput } });
		else dispatch(setAlerts(errors));
	};

	function GetError(field: string): string {
		return alerts.find((x) => x.field === field && x.component === 'register') ? 'error' : '';
	}

	return (
		<form id='register-box' onSubmit={handleSubmit(onSubmit)}>
			<h2 id='register-header'>Register</h2>
			<div id='first-and-last-name'>
				<input className={GetError('firstName')} placeholder='First Name' {...register('createUserInput.firstName')} />
				<input className={GetError('lastName')} placeholder='Last Name' {...register('createUserInput.lastName')} />
			</div>
			<input className={GetError('userName')} placeholder='Username' {...register('createUserInput.userName')} />
			<Password error={GetError('password')} {...register('createUserInput.password')} />
			<Password error={GetError('confirmPassword')} {...register('confirmPassword')} placeholder='Confirm Password' />
			<input className={GetError('emailAddress')} placeholder='E-Mail' {...register('createUserInput.emailAddress')} />
			<button id='register-button' type='submit'>
				Register
			</button>
		</form>
	);
}
