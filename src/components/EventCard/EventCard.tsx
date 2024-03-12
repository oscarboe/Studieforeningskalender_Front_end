import { cardInfo } from '../../../public/ExampleData';
import './EventCard.scss';

type eventCardProps = {
  event: cardInfo;
};

const EventCard = ({ event }: eventCardProps) => {
  return (
    <div id="eventCard">
      <img id="eventImage" src={event.image}></img>
      <div id="cardBottom">
        <h3>{event.eventName}</h3>
        <p>{event.description}</p>
        <button>View More</button>
      </div>
    </div>
  );
};

export default EventCard;
