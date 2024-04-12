import { useCallback, useEffect, useState } from 'react';
import './Calendar.scss';
import Monthly from './Montly/Monthly';
import Weekly from './Weekly/Weekly';
import Daily from './Daily/Daily';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import Navigate from './Navigate/Navigate';
import Select from './Select/Select';
import { CalendarEventsQuery, CalendarEventsQueryVariables } from '../../../generated/graphql/graphql';
import { useLazyQuery } from '@apollo/client';
import { CALENDAR_EVENTS } from '../../Queries/EventQueries';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../Redux/Slices/alertsSlice';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Euriope/Copenhagen');

export type EventDto = {
	id: string;
	title: string;
	description: string;
	startTime: Date;
	endTime: Date;
	smallImage: string;
};

export default function Calendar() {
	const [view, setView] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly');
	const [date, setDate] = useState<string>(dayjs.months()[dayjs().month()] + ', ' + dayjs().year());
	const [startDate, setStartDate] = useState<Date>(dayjs().startOf('month').toDate());
	const [endDate, setEndDate] = useState<Date>(dayjs().endOf('month').toDate());
	const [events, setEvents] = useState<EventDto[]>([]);
	const dispatch = useDispatch();

	const [getEvents] = useLazyQuery<CalendarEventsQuery, CalendarEventsQueryVariables>(CALENDAR_EVENTS, {
		onCompleted: (data) => {
			if (data.events?.items != null) setEvents(data.events.items);
			else
				dispatch(
					addAlert({
						message: `An error occurred while fetching the event for the specified ${view.toLowerCase()}`,
						severity: 'error',
					})
				);
		},
	});

	const renderSwitch = useCallback((): JSX.Element => {
		switch (view) {
			case 'Monthly':
				return <Monthly startDate={startDate} endDate={endDate} events={events} />;
			case 'Weekly':
				return <Weekly startDate={startDate} endDate={endDate} />;
			case 'Daily':
				return <Daily />;
			default:
				return <h1>An error occurred, try again later</h1>;
		}
	}, [view, startDate, events]);

	const setNewDate = (control: string, newStartDate: Date, newEndDate: Date) => {
		switch (control) {
			case 'Monthly':
				const month1 = dayjs.months()[newStartDate.getMonth()];
				const year = newStartDate.getFullYear();
				setDate(`${month1}, ${year}`);
				break;
			case 'Weekly':
				const month2 = dayjs.months()[newStartDate.getMonth()];
				var secondMonth = dayjs.months()[newEndDate.getMonth()];
				secondMonth = month2 == secondMonth ? '' : secondMonth + ' ';
				setDate(`${month2} ${newStartDate.getDate()} - ${secondMonth}${newEndDate.getDate()}`);
				break;
			case 'Daily':
				const day = dayjs.weekdays()[newStartDate.getDay()];
				const shortMonth = dayjs.monthsShort()[newStartDate.getMonth()];
				setDate(`${day} ${shortMonth} ${newStartDate.getDate()}`);
				break;
			default:
				console.log('Incorrect control value in setNewDate');
		}
	};

	const resetDate = () => {
		const newStartDate = dayjs().startOf('month').toDate();
		const newEndDate = dayjs().endOf('month').toDate();

		setStartDate(newStartDate);
		setEndDate(newEndDate);
		setNewDate(view, newStartDate, newEndDate);
	};

	useEffect(() => {
		if (view === 'Monthly') {
			const newStartDate = dayjs(startDate).startOf('month').startOf('week').add(1, 'day');
			const lastDayIsSunday = dayjs(endDate).endOf('month').weekday() === 0;
			const newEndDate = !lastDayIsSunday
				? dayjs(endDate).endOf('month').endOf('week').add(1, 'day')
				: dayjs(endDate).endOf('month').endOf('week').subtract(1, 'week').add(1, 'day');

			getEvents({ variables: { startTime: newStartDate.toDate(), endTime: newEndDate.toDate() } });
		} else getEvents({ variables: { startTime: startDate, endTime: endDate } });
	}, [startDate]);

	return (
		<div id='calendar'>
			<div id='selectors'>
				<Navigate
					startDate={startDate}
					endDate={endDate}
					view={view}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					date={date}
					setNewDate={setNewDate}
				/>
				<button onClick={resetDate} id='reset-date-button'>
					Today
				</button>
				<Select
					startDate={startDate}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					setNewDate={setNewDate}
					setView={setView}
				/>
			</div>
			{renderSwitch()}
		</div>
	);
}
