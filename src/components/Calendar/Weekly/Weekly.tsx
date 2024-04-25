import { useEffect, useState } from 'react';
import './Weekly.scss';
import Day from './Day/Day';
import { EventDto } from '../Calendar';
import dayjs from 'dayjs';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { CalendarEventsQuery, CalendarEventsQueryVariables } from '../../../../generated/graphql/graphql';
import { CALENDAR_EVENTS } from '../../../Queries/EventQueries';
import { addAlert } from '../../../Redux/Slices/alertsSlice';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export interface day {
	date: number;
	shortDay?: string;
	events: EventDto[];
}

export default function Weekly({ startDate, endDate }: { startDate: Date; endDate: Date }) {
	const [days, setDays] = useState<day[]>([]);
	const dispatch = useDispatch();

	const [getEvents] = useLazyQuery<CalendarEventsQuery, CalendarEventsQueryVariables>(CALENDAR_EVENTS, {
		onCompleted: (data) => {
			if (data.events?.items != null) {
				getDays(data.events.items);
			} else
				dispatch(
					addAlert({
						message: `An error occurred while fetching the event for the specified week`,
						severity: 'error',
					})
				);
		},
	});

	const getDays = (events: EventDto[]) => {
		const tempDays = [];

		for (
			let currentDate = new Date(startDate);
			currentDate <= endDate;
			currentDate.setDate(currentDate.getDate() + 1)
		) {
			tempDays.push({
				date: currentDate.getDate(), // Get the day number
				shortDay: dayjs.weekdaysShort(true)[currentDate.getDay()], // Get the short weekday name
				events: events.filter(
					(e) =>
						dayjs(currentDate).isSame(e.startTime, 'day') ||
						dayjs(currentDate).isSame(e.endTime, 'day') ||
						dayjs(currentDate).isBetween(e.startTime, e.endTime, 'day')
				),
			});
		}

		setDays(tempDays);
	};

	useEffect(() => {
		getEvents({ variables: { startTime: startDate, endTime: endDate } });
	}, [startDate, endDate]);

	return (
		<div id='calendar-weekly'>
			<div id='weekly-hours'>
				<p> </p>
				{hours.map((hour) => (
					<p key={hour}>{hour}</p>
				))}
			</div>
			<div id='weekly-days'>
				{days.map((day) => (
					<Day day={day} key={day.date + '' + day.shortDay} />
				))}
			</div>
		</div>
	);
}
