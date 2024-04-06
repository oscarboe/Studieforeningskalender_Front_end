import './Register.scss';
import { useMutation } from '@apollo/client';
import { REGISTER_QUERY } from '../../Queries/UserQueries';
import { CreateUserInput, CreateUserMutation, CreateUserMutationVariables } from '../../../generated/graphql/graphql';
import Password from '../Password/Password';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidateCreateUserInput } from '../../Validators/UserValidators';
import { useSelector, useDispatch } from 'react-redux';
import { emptyAlerts, setAlerts } from '../../Redux/Slices/alertsSlice';
import { RootState } from '../../Redux/store';
import { HandleGraphQLError, HandleGraphQLSuccess } from '../../Helpers/ResponseHelper';
import Spinner from '../Spinner/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';

export interface registerInput {
	createUserInput: CreateUserInput;
	confirmPassword: string;
}

export default function Register({ reCaptchaRef }: { reCaptchaRef: React.RefObject<ReCAPTCHA> }) {
	const { register, handleSubmit } = useForm<registerInput>();

	const alerts = useSelector((state: RootState) => state.alerts);
	const dispatch = useDispatch();

	const [registerUser, { loading }] = useMutation<CreateUserMutation, CreateUserMutationVariables>(REGISTER_QUERY, {
		onCompleted: (data) => HandleGraphQLSuccess(data.createUser, dispatch, 'createUser'),
		onError: (error) => HandleGraphQLError(error, dispatch),
	});

	const onSubmit: SubmitHandler<registerInput> = async (data) => {
		dispatch(emptyAlerts());
		const errors = ValidateCreateUserInput(data.createUserInput, data.confirmPassword);

		if (errors.length === 0) {
			data.createUserInput.recaptchaToken = (await reCaptchaRef.current?.executeAsync()) ?? '';
			registerUser({ variables: { createUserInput: data.createUserInput } });
			reCaptchaRef.current?.reset();
		} else dispatch(setAlerts(errors));
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
			<div id='submit-box'>
				{loading ? (
					<Spinner style={{ justifyContent: 'center' }} />
				) : (
					<button id='register-button' type='submit'>
						Register
					</button>
				)}
				<p>
					Upon registering, a verification email will be sent to the specified email address, your registration will not
					be complete until the verification is done.
				</p>
			</div>
		</form>
	);
}
