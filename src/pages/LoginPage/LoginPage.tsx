import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import './LoginPage.scss';

export default function LoginPage() {
	return (
		<div className='login-page'>
			<Login />
			<span id='vertical-line' />
			<Register />
		</div>
	);
}
