import { useEffect, useRef, memo } from 'react';
import './Monthly.scss';
import dayjs from 'dayjs';
import { EventDto } from '../Calendar';
import isBetween from 'dayjs/plugin/isBetween';
import Weeks from './Weeks/Weeks';
import Connectors from './Connectors/Connectors';

const shortWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
dayjs.extend(isBetween);

interface props {
	startDate: Date;
	endDate: Date;
	events: EventDto[];
}

export interface day {
	date: number;
	inCurrentMonth: boolean;
	dayEvents: EventDto[];
}

const Monthly = ({ startDate, endDate, events }: props) => {
	const eventRefs = useRef<HTMLImageElement[]>([]);

	const getRef = (el: HTMLImageElement | null) => {
		if (el) {
			eventRefs.current.push(el);
		}
	};

	useEffect(() => {
		eventRefs.current = [];
	}, [events]);

	return (
		<div id='calendar-month'>
			<Connectors eventRefs={eventRefs} />
			<div id='month-weekDays'>
				{shortWeekDays.map((dayName) => (
					<p key={dayName}>{dayName}</p>
				))}
			</div>
			<Weeks startDate={startDate} endDate={endDate} events={events} setRef={getRef} />
		</div>
	);
};

export default memo(Monthly);
