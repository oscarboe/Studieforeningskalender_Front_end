import { Fade, Modal } from '@mui/material';
import './DeleteUserModal.scss';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../Queries/UserQueries';
import { HandleGraphQLError, HandleGraphQLSuccess } from '../../Helpers/ResponseHelper';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptyAlerts } from '../../Redux/Slices/alertsSlice';
import { setLoggedIn } from '../../Redux/Slices/loggedInSlice';

interface props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export default function DeleteUserModal({ open, setOpen }: props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [deleteUser, { error }] = useMutation(DELETE_USER, {
		onCompleted: (data) => HandleGraphQLSuccess(data.deleteUser, dispatch, 'deleteUser'),
		onError: (error) => HandleGraphQLError(error, dispatch),
	});

	const onDelete = async () => {
		dispatch(emptyAlerts());
		await deleteUser();
		if (!error) {
			dispatch(setLoggedIn(false));
			navigate('/');
		}
	};

	return (
		<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition id='delete-user-modal'>
			<Fade in={open}>
				<div id='delete-user-box'>
					<h2>Delete User?</h2>
					<p>Are you sure you want to delete your user? This action cannot be undone.</p>
					<div>
						<button id='delete-user' onClick={onDelete}>
							Delete
						</button>
						<button onClick={() => setOpen(false)}>Cancel</button>
					</div>
				</div>
			</Fade>
		</Modal>
	);
}
