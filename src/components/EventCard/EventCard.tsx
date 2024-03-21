import { EventDto } from '../../Types/EventTypes';
import './EventCard.scss';

type eventCardProps = {
	event: EventDto;
};

const EventCard = ({ event }: eventCardProps) => {
	return (
		<div id='eventCard'>
			<img id='eventImage' src={`data:image/png;base64,${event.mediumImage}`}></img>
			<div id='cardBottom'>
				<h3>{event.title}</h3>
				<p>{event.description}</p>
				<button>View More</button>
			</div>
		</div>
	);
};

export default EventCard;
