import './Weeks.scss';
import { memo, useEffect, useState } from 'react';
import Day from '../Day/Day';
import { EventDto } from '../../Calendar';
import dayjs from 'dayjs';
import { day } from '../Monthly';

interface props {
	startDate: Date;
	endDate: Date;
	setRef: (el: HTMLImageElement | null) => void;
	events: EventDto[];
}

const Weeks = ({ startDate, endDate, setRef, events }: props) => {
	const [weeks, setWeeks] = useState<day[][]>([]);

	const getWeeks = (newStartDate: Date, newEndDate: Date) => {
		let currentDate = dayjs(newStartDate).startOf('month').startOf('week').add(1, 'day');
		const lastDayIsSunday = dayjs(newEndDate).endOf('month').weekday() === 0;
		const lastDate = !lastDayIsSunday
			? dayjs(newEndDate).endOf('month').endOf('week').add(1, 'day')
			: dayjs(newEndDate).endOf('month').endOf('week').subtract(1, 'week').add(1, 'day');

		let tempWeeks: day[][] = [];

		let i = 0,
			j = 0;
		while (currentDate.isBefore(lastDate)) {
			if (i === 0) tempWeeks.push([]);

			const eventsInDay = events.filter(
				(e) =>
					currentDate.isSame(e.startTime, 'day') ||
					currentDate.isSame(e.endTime, 'day') ||
					currentDate.isBetween(e.startTime, e.endTime, 'day')
			);
			const isInCurrentMonth = newStartDate.getMonth() == currentDate.toDate().getMonth();
			tempWeeks[j].push({ date: currentDate.date(), inCurrentMonth: isInCurrentMonth, dayEvents: eventsInDay });

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
		getWeeks(startDate, endDate);
	}, [events]);

	return (
		<div id='weeks'>
			{weeks.map((week, i) => (
				<div className='week' key={week.toString() + i}>
					{week.map((day) => (
						<Day setRef={setRef} day={day} key={day.date + '' + day.inCurrentMonth} />
					))}
				</div>
			))}
		</div>
	);
};

export default memo(Weeks);
