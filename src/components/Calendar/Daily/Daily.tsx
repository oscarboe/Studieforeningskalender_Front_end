import { useLazyQuery } from '@apollo/client';
import {
	CalendarEventsBigImageQuery,
	CalendarEventsBigImageQueryVariables,
} from '../../../../generated/graphql/graphql';
import { CALENDAR_EVENTS_BIG_IMAGE } from '../../../Queries/EventQueries';
import { addAlert } from '../../../Redux/Slices/alertsSlice';
import { EventDto } from '../Calendar';
import DayEvents from '../DayEvents/DayEvents';
import './Daily.scss';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export default function Daily({ date }: { date: Date }) {
	const [events, setEvents] = useState<EventDto[]>([]);
	const dispatch = useDispatch();

	const [getEvents] = useLazyQuery<CalendarEventsBigImageQuery, CalendarEventsBigImageQueryVariables>(
		CALENDAR_EVENTS_BIG_IMAGE,
		{
			onCompleted: (data) => {
				if (data.events?.items != null) setEvents(data.events.items);
				else
					dispatch(
						addAlert({
							message: `An error occurred while fetching the event for the specified day`,
							severity: 'error',
						})
					);
			},
		}
	);

	useEffect(() => {
		getEvents({ variables: { startTime: dayjs(date).startOf('day'), endTime: dayjs(date).endOf('day') } });
	}, [date]);

	return (
		<div id='calendar-daily'>
			<div id='daily-hours'>
				{hours.map((hour) => (
					<p key={hour}>{hour}</p>
				))}
			</div>
			<div id='daily-day'>
				{hours.map((hour) => (
					<div className='daily-whole-hour' key={hour}>
						<span className='daily-top-span' />
						<span className='daily-bottom-span' />
					</div>
				))}
				<DayEvents day={{ events: events, date: date.getDate() }} />
			</div>
		</div>
	);
}
