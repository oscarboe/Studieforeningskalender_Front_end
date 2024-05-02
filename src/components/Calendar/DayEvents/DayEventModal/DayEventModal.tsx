import { Modal, Fade } from '@mui/material';
import { Event } from '../../../../pages/HomePage/HomePage';
import './DayEventModal.scss';
import { IoTimeOutline } from 'react-icons/io5';
import { PiCalendarBlankLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GetMediumEventImageQuery, GetMediumEventImageQueryVariables } from '../../../../../generated/graphql/graphql';
import { GET_MEDIUM_EVENT_IMAGE } from '../../../../Queries/EventQueries';
import { useEffect } from 'react';

interface props {
	event: Event;
	open: boolean;
	setOpen: (value: React.SetStateAction<boolean>) => void;
	imageSize: 'small' | 'medium' | 'large';
}

const DayEventModal = ({ event, open, setOpen, imageSize }: props) => {
	const navigate = useNavigate();

	const [getMediumImage, { data }] = useLazyQuery<GetMediumEventImageQuery, GetMediumEventImageQueryVariables>(
		GET_MEDIUM_EVENT_IMAGE
	);

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

	useEffect(() => {
		if (imageSize == 'small' && event.id) getMediumImage({ variables: { EventId: event.id } });
	}, [event.id]);

	const goToEvent = () => {
		navigate('/Event', { state: { event: event, imageSize: imageSize } });
	};

	return (
		<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition className='modal-for-day'>
			<Fade in={open}>
				<div className='eventCard'>
					<img className='eventImage' src={`data:image/png;base64,${data?.event?.mediumImage || event.image}`}></img>
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
							<button onClick={goToEvent}>View More</button>
						</div>
					</div>
				</div>
			</Fade>
		</Modal>
	);
};

export default DayEventModal;
