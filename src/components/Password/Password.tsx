import './Password.scss';
import { forwardRef, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface props {
	error: string;
	placeholder?: string;
}

const Password = forwardRef<HTMLInputElement, props & React.InputHTMLAttributes<HTMLInputElement>>(
	({ placeholder, error, ...inputProps }, ref) => {
		const [hidePassword, setHidePassword] = useState(true);

		const handleToggle = () => setHidePassword(!hidePassword);

		return (
			<div className='password'>
				<input
					{...inputProps}
					ref={ref}
					className={error}
					placeholder={placeholder ? placeholder : 'Password'}
					type={hidePassword ? 'password' : 'text'}
				/>
				<span className='eye' onClick={handleToggle}>
					{hidePassword ? <FaRegEyeSlash /> : <FaRegEye />}
				</span>
			</div>
		);
	}
);

export default Password;
