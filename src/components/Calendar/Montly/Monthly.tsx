import { useEffect, useRef, memo, useState } from 'react';
import './Monthly.scss';
import dayjs from 'dayjs';
import { EventDto } from '../Calendar';
import isBetween from 'dayjs/plugin/isBetween';
import Weeks from './Weeks/Weeks';
import Connectors from './Connectors/Connectors';
import { useLazyQuery } from '@apollo/client';
import { CalendarEventsQuery, CalendarEventsQueryVariables } from '../../../../generated/graphql/graphql';
import { CALENDAR_EVENTS } from '../../../Queries/EventQueries';
import { addAlert } from '../../../Redux/Slices/alertsSlice';
import { useDispatch } from 'react-redux';

const shortWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
dayjs.extend(isBetween);

interface props {
	startDate: Date;
	endDate: Date;
}

export interface day {
	date: number;
	inCurrentMonth: boolean;
	dayEvents: EventDto[];
}

const Monthly = ({ startDate, endDate }: props) => {
	const eventRefs = useRef<HTMLImageElement[]>([]);
	const [subConnData, setSubConnData] = useState<{ origin: DOMRect; offsets: number[] } | null>(null);
	const [events, setEvents] = useState<EventDto[]>([]);

	const dispatch = useDispatch();

	const [getEvents] = useLazyQuery<CalendarEventsQuery, CalendarEventsQueryVariables>(CALENDAR_EVENTS, {
		onCompleted: (data) => {
			if (data.events?.items != null) setEvents(data.events.items);
			else
				dispatch(
					addAlert({
						message: `An error occurred while fetching the event for the specified month`,
						severity: 'error',
					})
				);
		},
	});

	const getRef = (el: HTMLImageElement | null) => {
		if (el) {
			eventRefs.current.push(el);
		}
	};

	const setSubConnectors = (origin: DOMRect, offsets: number[]) => {
		setSubConnData({ origin: origin, offsets: offsets });
	};

	useEffect(() => {
		eventRefs.current = [];

		const newStartDate = dayjs(startDate).startOf('month').startOf('week').add(1, 'day');
		const lastDayIsSunday = dayjs(endDate).endOf('month').weekday() === 0;
		const newEndDate = !lastDayIsSunday
			? dayjs(endDate).endOf('month').endOf('week').add(1, 'day')
			: dayjs(endDate).endOf('month').endOf('week').subtract(1, 'week').add(1, 'day');

		getEvents({ variables: { startTime: newStartDate.toDate(), endTime: newEndDate.toDate() } });
	}, [startDate]);

	useEffect(() => {
		eventRefs.current = [];
	}, [events]);

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
				setSubConnectors={setSubConnectors}
			/>
		</div>
	);
};

export default memo(Monthly);
