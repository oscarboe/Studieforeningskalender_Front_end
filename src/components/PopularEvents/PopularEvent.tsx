import { useNavigate } from 'react-router-dom';
import './PopularEvent.css';
import { Event } from '../../pages/HomePage/HomePage';

type PopularEventProps = {
	eventData: Event;
	swap?: boolean;
};

export default function PopularEvent({ eventData, swap }: PopularEventProps) {
	const navigate = useNavigate();

	const goToEvent = () => {
		navigate('/Event', { state: { event: eventData, imageSize: 'large' } });
	};

	return (
		<div className='PopularEvent' style={{ flexDirection: swap ? 'row' : 'row-reverse' }}>
			<img className='img' src={`data:image/png;base64,${eventData.image}`} alt='Event' />
			<div className='h1'>
				<div id='textPart'>
					<div className='title'>{eventData.title}</div>
					<div className='description'>{eventData.description}</div>
				</div>
				<button id='eventButton' onClick={goToEvent}>
					Se Mere
				</button>
			</div>
		</div>
	);
}
