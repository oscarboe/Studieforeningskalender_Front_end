import { useNavigate } from 'react-router-dom';
import { Event } from '../../pages/HomePage/HomePage';
import './EventCard.scss';

type eventCardProps = {
	event: Event;
};

const EventCard = ({ event }: eventCardProps) => {
	const navigate = useNavigate();

	const goToEvent = () => {
		navigate('/Event', { state: { event: event, imageSize: 'medium' } });
	};

	return (
		<div id='eventCard'>
			<img id='eventImage' src={`data:image/png;base64,${event.mediumImage}`} alt={event.title}></img>
			<div id='cardBottom'>
				<h3>{event.title}</h3>
				<p>{event.description}</p>
				<button onClick={goToEvent}>View More</button>
			</div>
		</div>
	);
};

export default EventCard;
