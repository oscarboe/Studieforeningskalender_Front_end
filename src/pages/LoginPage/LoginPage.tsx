import { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import './LoginPage.scss';
import { validationError } from '../../Validators/UserValidators';
import Alert from '@mui/material/Alert';

export interface alertProps {
	alerts: validationError[];
	setAlerts: React.Dispatch<React.SetStateAction<validationError[]>>;
}

export default function LoginPage() {
	const [alerts, setAlerts] = useState<validationError[]>([]);

	return (
		<div className='login-page'>
			<div id='alert-box'>
				{alerts.map((data, index) => (
					<Alert
						className='alert'
						severity={data.severity}
						key={data.message}
						style={{ animationDelay: `${index * 0.15}s, ${10 + index * 0.15}s` }}
						onClose={() => setAlerts((e) => e.filter((x) => x.message != data.message))}
					>
						{data.message}
					</Alert>
				))}
			</div>
			<Login alerts={alerts} setAlerts={setAlerts} />
			<span id='vertical-line' />
			<Register alerts={alerts} setAlerts={setAlerts} />
		</div>
	);
}
