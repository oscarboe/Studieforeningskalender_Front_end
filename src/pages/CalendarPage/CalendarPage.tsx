import './CalendarPage.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLazyQuery } from '@apollo/client';
import { CALENDAR_EVENTS } from '../../Queries/EventQueries';
import { CalendarEventsQuery, CalendarEventsQueryVariables } from '../../../generated/graphql/graphql';
import { useEffect } from 'react';
import Calendar from '../../components/Calendar/Calendar';

export default function CalendarPage() {
	// const [getCalendarEvents, { data }] = useLazyQuery<CalendarEventsQuery, CalendarEventsQueryVariables>(
	// 	CALENDAR_EVENTS,
	// 	{ onCompleted: (data) => console.log(data) }
	// );

	// useEffect(() => {
	// 	var date = new Date(),
	// 		y = date.getFullYear(),
	// 		m = date.getMonth();
	// 	const firstDay = new Date(y, m, 1);
	// 	const lastDay = new Date(y, m + 1, 0);

	// 	getCalendarEvents({ variables: { startTime: firstDay, endTime: lastDay } });
	// }, []);

	return (
		<div id='calendar-page'>
			<h1>The Calendar</h1>
			<Calendar />
		</div>
	);
}
