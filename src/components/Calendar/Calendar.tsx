import { useCallback, useState } from 'react';
import './Calendar.scss';
import Monthly from './Montly/Monthly';
import Weekly from './Weekly/Weekly';
import Daily from './Daily/Daily';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import Navigate from './Navigate/Navigate';
import Select from './Select/Select';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Copenhagen');

export type EventDto = {
	id: string;
	title: string;
	description: string;
	startTime: Date;
	endTime: Date;
	image: string;
};

export default function Calendar() {
	const [view, setView] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly');
	const [date, setDate] = useState<string>(dayjs.months()[dayjs().month()] + ', ' + dayjs().year());
	const [startDate, setStartDate] = useState<Date>(dayjs().startOf('month').toDate());
	const [endDate, setEndDate] = useState<Date>(dayjs().endOf('month').toDate());

	const renderSwitch = useCallback((): JSX.Element => {
		switch (view) {
			case 'Monthly':
				return <Monthly startDate={startDate} endDate={endDate} />;
			case 'Weekly':
				return <Weekly startDate={startDate} endDate={endDate} />;
			case 'Daily':
				return <Daily date={startDate} />;
			default:
				return <h1>An error occurred, try again later</h1>;
		}
	}, [view, startDate]);

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
		let newStartDate, newEndDate;

		switch (view) {
			case 'Monthly':
				newStartDate = dayjs().startOf('month').toDate();
				newEndDate = dayjs().endOf('month').toDate();
				break;
			case 'Weekly':
				newStartDate = dayjs().startOf('week').toDate();
				newEndDate = dayjs().endOf('week').toDate();
				break;
			case 'Daily':
				newStartDate = dayjs().startOf('day').toDate();
				newEndDate = dayjs().endOf('day').toDate();
				break;
		}

		setStartDate(newStartDate);
		setEndDate(newEndDate);
		setNewDate(view, newStartDate, newEndDate);
	};

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
