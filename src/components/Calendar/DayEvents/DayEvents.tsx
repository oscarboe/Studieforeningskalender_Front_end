import { useState, useEffect } from 'react';
import { day } from '../Weekly/Weekly';
import './DayEvents.scss';
import { EventDto } from '../Calendar';
import { Event } from '../../../pages/HomePage/HomePage';
import dayjs from 'dayjs';
import DayEventModal from './DayEventModal/DayEventModal';

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

	const overlapsOtherEvents = (
		events: EventDto[],
		i: number,
		startTime: Date,
		endTime: Date
	): { overlaps: boolean; amount: number } => {
		if (events.length <= 1) return { overlaps: false, amount: 0 };

		const overlaps = events.map((event, index) => {
			if (index == i) return false;

			if (events.length > i + 1) {
				if (dayjs(endTime).isBetween(event.startTime, event.endTime)) return true;
				if (dayjs(event.startTime).isBefore(endTime)) return true;
			}
			if (i > 0) {
				if (dayjs(startTime).isBetween(event.startTime, event.endTime)) return true;
			}
		});

		return { overlaps: overlaps.length > 0, amount: overlaps.length };
	};

	const drawEvents = () => {
		let tempStyles: dayEvent[] = [];
		day.events.forEach((event, i) => {
			const startTime = new Date(event.startTime);
			const endTime = new Date(event.endTime);

			let { overlaps, amount } = overlapsOtherEvents(day.events, i, startTime, endTime);
			console.log(overlaps, amount);

			let left: string | number = 0;
			let width: string = '100%';
			if (overlaps) {
				if (day.shortDay && window.innerWidth > 1300) {
					const orientRight = tempStyles.length >= 1 && tempStyles[i - 1].style.left === 0;

					left = orientRight ? '50%' : 0;
					width = '50%';
				} else {
					if (amount < 5) {
						left = i * (100 / amount) + '%';
						width = 100 / amount + '%';
					} else {
						width = '20%';
						left = (i % 5) * 20 + '%';
					}
				}
			}

			tempStyles.push({
				style: {
					top: calculateTop(startTime),
					height: calculateHeight(startTime, endTime),
					width: width,
					left: left,
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
			<DayEventModal event={selectedEvent} open={open} setOpen={setOpen} imageSize={day.shortDay ? 'small' : 'large'} />
		</>
	);
};

export default DayEvents;
