import { useCallback, useEffect, useState } from 'react';
import './Calendar.scss';
import Monthly from './Montly/Monthly';
import Weekly from './Weekly/Weekly';
import Daily from './Daily/Daily';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(localeData);
dayjs.extend(weekday);

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
				return <Weekly />;
			case 'Daily':
				return <Daily />;
			default:
				return <h1>An error occurred, try again later</h1>;
		}
	}, [view]);

	const changeDate = (dir: 'next' | 'prev') => {
		const unit: dayjs.ManipulateType = view == 'Monthly' ? 'month' : view == 'Weekly' ? 'week' : 'day';

		var newStartDate = dayjs(startDate)
			.add(dir === 'next' ? 1 : -1, unit)
			.toDate();
		var newEndDate = dayjs(endDate)
			.add(dir === 'next' ? 1 : -1, unit)
			.toDate();

		setStartDate(newStartDate);
		setEndDate(newEndDate);

		setNewDate(view, newStartDate, newEndDate);
	};

	const changeView = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setView(e.currentTarget.value);
		const unit: dayjs.ManipulateType =
			e.currentTarget.value == 'Monthly' ? 'month' : e.currentTarget.value == 'Weekly' ? 'week' : 'day';

		const newStartDate = dayjs(startDate).startOf(unit).toDate();
		const newEndDate = dayjs(startDate).endOf(unit).toDate();

		setStartDate(newStartDate);
		setEndDate(newEndDate);

		setNewDate(e.currentTarget.value, newStartDate, newEndDate);
	};

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

	return (
		<div id='calendar'>
			<div id='selectors'>
				<div id='navigate'>
					<div className='double-arrow'>
						<IoIosArrowBack onClick={() => changeDate('prev')} />
						<IoIosArrowBack onClick={() => changeDate('prev')} />
					</div>
					<IoIosArrowBack onClick={() => changeDate('prev')} />
					<p id='date'>{date}</p>
					<IoIosArrowForward onClick={() => changeDate('next')} />
					<div className='double-arrow'>
						<IoIosArrowForward onClick={() => changeDate('next')} />
						<IoIosArrowForward onClick={() => changeDate('next')} />
					</div>
				</div>
				<select id='view' onChange={changeView}>
					<option value='Monthly'>Monthly</option>
					<option value='Weekly'>Weekly</option>
					<option value='Daily'>Daily</option>
				</select>
			</div>
			{renderSwitch()}
		</div>
	);
}
