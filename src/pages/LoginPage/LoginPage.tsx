import ReCAPTCHA from 'react-google-recaptcha';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import './LoginPage.scss';
import { useRef } from 'react';

export default function LoginPage() {
	const reCaptchaRef = useRef<ReCAPTCHA>(null);

	return (
		<div className='login-page'>
			<Login reCaptchaRef={reCaptchaRef} />
			<span id='vertical-line' />
			<Register reCaptchaRef={reCaptchaRef} />
			<ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY ?? ''} size='invisible' ref={reCaptchaRef} />
		</div>
	);
}
