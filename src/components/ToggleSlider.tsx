import { useState } from 'react';
import './ToggleSlider.css';

interface ToggleProps {
	toggle: boolean;
	handleToggleChange?: () => void;
	text: [string, string];
}

const ToggleSlider = ({ toggle, handleToggleChange, text }: ToggleProps) => {
	const [localToggle, setLocalToggle] = useState(false);

	const handleToggle = handleToggleChange ? handleToggleChange : () => setLocalToggle(!localToggle);
	const displayToggle = handleToggleChange ? toggle : localToggle;

	return (
		<div className='toggle-container' onClick={handleToggle}>
			<div className={`toggle-btn ${!displayToggle ? 'disable' : ''}`}>{displayToggle ? text[1] : text[0]}</div>
		</div>
	);
};

export default ToggleSlider;
