import { useEffect, useState } from 'react';
import './Monthly.scss';
import dayjs from 'dayjs';

const shortWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Monthly({ startDate, endDate }: { startDate: Date; endDate: Date }) {
	const [weeks, setWeeks] = useState<{ date: number; inCurrentMonth: boolean }[][]>([]);

	const getWeeks = (newStartDate: Date, newEndDate: Date) => {
		let currentDate = dayjs(newStartDate).startOf('month').startOf('week').add(1, 'day');
		const lastDate = dayjs(newEndDate).endOf('month').endOf('week').add(1, 'day');

		let tempWeeks: { date: number; inCurrentMonth: boolean }[][] = [];

		let i = 0,
			j = 0;
		while (j < 7 && currentDate.isBefore(lastDate)) {
			if (i === 0) tempWeeks.push([]);

			const isInCurrentMonth = newStartDate.getMonth() == currentDate.toDate().getMonth();
			tempWeeks[j].push({ date: currentDate.date(), inCurrentMonth: isInCurrentMonth });

			currentDate = currentDate.add(1, 'day');

			i++;
			if (i >= 7) {
				i = 0;
				j++;
			}
		}

		setWeeks(tempWeeks);
	};

	useEffect(() => {
		console.log(startDate);
		getWeeks(startDate, endDate);
	}, [startDate, endDate]);

	return (
		<div id='calendar-month'>
			<div id='month-weekDays'>
				{shortWeekDays.map((dayName) => (
					<p key={dayName}>{dayName}</p>
				))}
			</div>
			<div id='weeks'>
				{weeks.map((week, index) => (
					<div className='week' key={week.toString() + index}>
						{week.map((day) => (
							<p className={!day.inCurrentMonth ? 'outSideMonth' : ''} key={day.date + '' + day.inCurrentMonth}>
								{day.date}
							</p>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
