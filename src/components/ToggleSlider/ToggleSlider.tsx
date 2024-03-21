import { useState } from 'react';
import './ToggleSlider.css';

interface ToggleProps {
	setSortPopular: React.Dispatch<React.SetStateAction<boolean>>;
	text: [string, string];
}

const ToggleSlider = ({ setSortPopular, text }: ToggleProps) => {
	const [localToggle, setLocalToggle] = useState(false);

	const handleToggle = () => {
		setLocalToggle(!localToggle);
		setSortPopular(localToggle);
	};
	const displayToggle = localToggle;

	return (
		<div className='toggle-container' onClick={handleToggle}>
			<div className={`toggle-btn ${!displayToggle ? 'disable' : ''}`}>{displayToggle ? text[1] : text[0]}</div>
		</div>
	);
};

export default ToggleSlider;
