import { useState, useEffect } from 'react';
import { day } from '../Weekly/Weekly';
import './DayEvents.scss';
import { EventDto } from '../Calendar';
import { Fade, Modal } from '@mui/material';
import EventCard from '../../EventCard/EventCard';
import { Event } from '../../../pages/HomePage/HomePage';

interface dayEvent {
	style: React.CSSProperties;
	event: EventDto;
}

interface props {
	day: day;
}

const DayEvents = ({ day }: props) => {
	const [events, setEvents] = useState<dayEvent[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<Event>({});

	// There is 25 fields and therefore a divisor of 25 when it is a day in the weekly component
	const divisor = day.shortDay ? 25 : 24;

	const calculateTop = (startTime: Date): string => {
		const startsToday = startTime.getDate() === day.date;
		const decimalTime = startsToday ? startTime.getHours() + startTime.getMinutes() / 60 : 0;
		const dateSpacing = day.shortDay ? 1 / divisor : 0;

		return (decimalTime / divisor + dateSpacing) * 100 + '%';
	};

	const calculateHeight = (startTime: Date, endTime: Date): string => {
		const startsToday = startTime.getDate() === day.date;
		const decimalStart = startsToday ? startTime.getHours() + startTime.getMinutes() / 60 : 0;

		const endsToday = endTime.getDate() === day.date;
		const decimalEnd = endsToday ? endTime.getHours() + endTime.getMinutes() / 60 : 24;

		const duration = decimalEnd - decimalStart;
		return (duration / divisor) * 100 + '%';
	};

	const drawEvents = () => {
		let tempStyles: dayEvent[] = [];
		day.events.forEach((event, i) => {
			const startTime = new Date(event.startTime);
			const endTime = new Date(event.endTime);

			tempStyles.push({
				style: {
					top: calculateTop(startTime),
					height: calculateHeight(startTime, endTime),
					width: '100%',
				},
				event: event,
			});

			if (startTime.getDate() < day.date) {
				tempStyles[i].style.borderTopLeftRadius = 0;
				tempStyles[i].style.borderTopRightRadius = 0;
			}
			if (
				endTime.getDate() > day.date &&
				!(endTime.getDate() + 1 === day.date && endTime.getHours() === 0 && endTime.getMinutes() === 0)
			) {
				tempStyles[i].style.borderBottomLeftRadius = 0;
				tempStyles[i].style.borderBottomRightRadius = 0;
			}
		});
		setEvents(tempStyles);
	};

	const useImage = (style: React.CSSProperties): boolean => {
		const height = style.height?.toString().split('%')[0];
		if (!height) return false;

		const pixelHeight = (parseFloat(height) / 100) * window.innerHeight;
		return pixelHeight > 50;
	};

	useEffect(() => {
		drawEvents();
	}, [day]);

	return (
		<>
			{events.map(({ style, event }, i) => (
				<div
					style={style}
					className='day-event'
					key={style + '' + i}
					onClick={() => {
						setOpen(true);
						setSelectedEvent(event);
					}}
				>
					<h3 className='day-event-title'>{event.title}</h3>
					{useImage(style) ? <img src={`data:image/png;base64,${event.image}`} className='day-event-image' /> : ''}
				</div>
			))}
			<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition className='modal-for-day'>
				<Fade in={open}>
					<div className='monthly-day-event'>
						<EventCard event={{ ...selectedEvent, mediumImage: selectedEvent.image }} />
					</div>
				</Fade>
			</Modal>
		</>
	);
};

export default DayEvents;
