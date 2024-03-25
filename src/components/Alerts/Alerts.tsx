import './Alerts.scss';
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../../Redux/Slices/alertsSlice';
import { RootState } from '../../Redux/store';

export default function Alerts() {
	const alerts = useSelector((state: RootState) => state.alerts);
	const dispatch = useDispatch();

	return (
		<div id='alert-box'>
			{alerts.map((data, index) => (
				<Alert
					className='alert'
					severity={data.severity}
					key={data.message}
					style={{ animationDelay: `${index * 0.15}s, ${10 + index * 0.15}s` }}
					onClose={() => dispatch(removeAlert(data))}
				>
					{data.message}
				</Alert>
			))}
		</div>
	);
}
