import './CalendarPage.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useLazyQuery } from '@apollo/client';
import { CALENDAR_EVENTS } from '../../Queries/EventQueries';
import { CalendarEventsQuery, CalendarEventsQueryVariables } from '../../../generated/graphql/graphql';
import { useEffect } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Copenhagen');
const localizer = dayjsLocalizer(dayjs);

export default function CalendarPage() {
	const [getCalendarEvents, { data }] = useLazyQuery<CalendarEventsQuery, CalendarEventsQueryVariables>(
		CALENDAR_EVENTS,
		{ onCompleted: (data) => console.log(data) }
	);

	const onNavigate = (newDate: Date, view: dayjs.OpUnitType) => {
		const start = dayjs(newDate).startOf(view).toDate(),
			end = dayjs(newDate).endOf(view).toDate();

		getCalendarEvents({ variables: { startTime: start, endTime: end } });
	};

	useEffect(() => {
		var date = new Date(),
			y = date.getFullYear(),
			m = date.getMonth();
		const firstDay = new Date(y, m, 1);
		const lastDay = new Date(y, m + 1, 0);

		getCalendarEvents({ variables: { startTime: firstDay, endTime: lastDay } });
	}, []);

	return (
		<div id='calendar-page'>
			<h1>The Calendar</h1>
			<Calendar
				localizer={localizer}
				events={data?.events?.events ?? []}
				startAccessor={(e) => {
					const date = dayjs.tz(e.start).toDate();
					// console.log(date);
					return date;
				}}
				endAccessor={(e) => new Date(e.end)}
				allDayAccessor={() => false}
				onNavigate={onNavigate}
				formats={{ timeGutterFormat: 'HH:mm' }}
			/>
		</div>
	);
}
