import { useEffect, useRef, memo, useState } from 'react';
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
	const [subConnData, setSubConnData] = useState<{ origin: DOMRect; offsets: number[] } | null>(null);

	const getRef = (el: HTMLImageElement | null) => {
		if (el) {
			eventRefs.current.push(el);
		}
	};

	const addSubConnectors = (origin: DOMRect, offsets: number[]) => {
		setSubConnData({ origin: origin, offsets: offsets });
	};

	useEffect(() => {
		eventRefs.current = [];
	}, [events, startDate]);

	return (
		<div id='calendar-month'>
			<Connectors eventRefs={eventRefs} events={events} subConnData={subConnData} />
			<div id='month-weekDays'>
				{shortWeekDays.map((dayName) => (
					<p key={dayName}>{dayName}</p>
				))}
			</div>
			<Weeks
				startDate={startDate}
				endDate={endDate}
				events={events}
				setRef={getRef}
				addSubConnectors={addSubConnectors}
			/>
		</div>
	);
};

export default memo(Monthly);
