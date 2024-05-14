import './AccountPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useEffect, useRef, useState } from 'react';
import { setAlerts } from '../../Redux/Slices/alertsSlice';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER_INFO, SIGN_OUT_QUERY, UPDATE_USER } from '../../Queries/UserQueries';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GetUserQuery, UpdateUserInput } from '../../../generated/graphql/graphql';
import ReCAPTCHA from 'react-google-recaptcha';
import { ValidateUpdateUser } from '../../Validators/UserValidators';
import DeleteUserModal from '../../components/DeleteUserModal/DeleteUserModal';
import { HandleGraphQLError, HandleGraphQLSuccess } from '../../Helpers/ResponseHelper';
import { setLoggedIn } from '../../Redux/Slices/loggedInSlice';

export default function AccountPage() {
	const [open, setOpen] = useState(false);
	const isLoggedIn = useSelector((state: RootState) => state.loggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const reCaptchaRef = useRef<ReCAPTCHA>(null);

	const [placeholders, setPlaceholders] = useState<GetUserQuery>({
		userInfo: { userName: '', firstName: '', lastName: '', emailAddress: '' },
	});

	const { register, handleSubmit } = useForm<UpdateUserInput>();

	const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
		onCompleted: (data) => setPlaceholders(data),
		fetchPolicy: 'no-cache',
	});
	const [updateUser] = useMutation(UPDATE_USER, {
		onCompleted: (data) => HandleGraphQLSuccess(data.updateUser, dispatch, 'updateUser'),
		onError: (error) => HandleGraphQLError(error, dispatch),
	});
	const [signOutUser] = useMutation(SIGN_OUT_QUERY, {
		onCompleted: () => {
			dispatch(setLoggedIn(false));
			navigate('/');
		},
	});

	useEffect(() => {
		if (!isLoggedIn) {
			dispatch(setAlerts([{ message: 'You must be logged in to access this page', severity: 'error' }]));
			navigate('/');
		} else {
			getUserInfo();
		}
	}, []);

	const onSubmit: SubmitHandler<UpdateUserInput> = async (data) => {
		console.log(data);
		const errorArr = ValidateUpdateUser(data);

		if (errorArr.length === 0) {
			data.reCaptchaToken = (await reCaptchaRef.current?.executeAsync()) ?? '';
			await updateUser({ variables: { updateUser: data } });
			reCaptchaRef.current?.reset();
		} else dispatch(setAlerts(errorArr));
	};

	const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setOpen(true);
	};

	const signOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		signOutUser();
	};

	return (
		<div id='account-page'>
			<form id='account-form' onSubmit={handleSubmit(onSubmit)}>
				<h1>Account</h1>
				<div className='account-field'>
					<h3>Username</h3>
					<input type='text' placeholder={placeholders.userInfo?.userName} {...register('userName')} />
				</div>
				<div className='account-field'>
					<h3>First Name</h3>
					<input type='text' placeholder={placeholders.userInfo?.firstName} {...register('firstName')} />
				</div>
				<div className='account-field'>
					<h3>Last Name</h3>
					<input type='text' placeholder={placeholders.userInfo?.lastName} {...register('lastName')} />
				</div>
				<div className='account-field'>
					<h3>Email Address</h3>
					<input type='text' className='email-input' placeholder={placeholders.userInfo?.emailAddress} readOnly />
				</div>
				<div id='account-buttons'>
					<button type='submit'>Update Profile</button>
					<button type='button' onClick={signOut}>
						Sign Out
					</button>
					<button id='delete-profile-button' onClick={onDelete}>
						Delete Profile
					</button>
				</div>
			</form>
			<DeleteUserModal open={open} setOpen={setOpen} />
			<ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY ?? ''} size='invisible' ref={reCaptchaRef} />
		</div>
	);
}
