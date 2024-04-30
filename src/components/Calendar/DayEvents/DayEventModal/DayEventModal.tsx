import { Modal, Fade } from '@mui/material';
import { Event } from '../../../../pages/HomePage/HomePage';
import './DayEventModal.scss';
import { IoTimeOutline } from 'react-icons/io5';
import { PiCalendarBlankLight } from 'react-icons/pi';

interface props {
	event: Event;
	open: boolean;
	setOpen: (value: React.SetStateAction<boolean>) => void;
}

const DayEventModal = ({ event, open, setOpen }: props) => {
	const getDateString = (): string => {
		if (!event.startTime || !event.endTime) return '';
		const startTime = new Date(event.startTime);
		const endTime = new Date(event.endTime);

		const startDate = `${startTime?.getDate()}/${startTime?.getMonth()}/${startTime
			?.getFullYear()
			.toString()
			.substring(2)}`;
		const endDate = `${endTime?.getDate()}/${endTime?.getMonth()}/${endTime?.getFullYear().toString().substring(2)}`;

		return `${startDate} - ${endDate}`;
	};

	const getTimeString = (): string => {
		if (!event.startTime || !event.endTime) return '';
		const startTime = new Date(event.startTime);
		const endTime = new Date(event.endTime);

		const start = `${timeString(startTime.getHours())}:${timeString(startTime.getMinutes())}`;
		const end = `${timeString(endTime.getHours())}:${timeString(endTime.getMinutes())}`;

		return `${start} - ${end}`;
	};

	const timeString = (time: number): string | number => {
		if (time < 10) return '0' + time;
		return time;
	};

	return (
		<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition className='modal-for-day'>
			<Fade in={open}>
				<div className='eventCard'>
					<img className='eventImage' src={`data:image/png;base64,${event.image}`}></img>
					<div className='cardBottom'>
						<div className='title-desc'>
							<h3>{event.title}</h3>
							<p>{event.description}</p>
						</div>
						<div className='time-button'>
							<div className='event-date'>
								<PiCalendarBlankLight />
								<p>{getDateString()}</p>
							</div>
							<div className='event-time'>
								<IoTimeOutline />
								<p>{getTimeString()}</p>
							</div>
							<button>View More</button>
						</div>
					</div>
				</div>
			</Fade>
		</Modal>
	);
};

export default DayEventModal;
