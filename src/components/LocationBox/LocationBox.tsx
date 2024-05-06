import { FaLocationDot } from 'react-icons/fa6';
import { Event } from '../../pages/HomePage/HomePage';
import './LocationBox.scss';

const LocationBox = ({ event }: { event: Event }) => {
	return (
		<div className='location-box'>
			<p className='title'>Location</p>
			<div className='location'>
				<FaLocationDot className='logo' />
				<address>
					{event.addressLine}, {event.postalCode} {event.city}
				</address>
			</div>
		</div>
	);
};

export default LocationBox;
