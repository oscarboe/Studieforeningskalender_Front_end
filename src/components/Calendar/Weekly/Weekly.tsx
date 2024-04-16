import { useEffect, useState } from 'react';
import './Weekly.scss';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
const shortWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Weekly({ startDate, endDate }: { startDate: Date; endDate: Date }) {
	const [days, setDays] = useState<{ date: number; shortDay: string }[]>([]);

	const getDays = () => {
		const tempDays = [];

		for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
			tempDays.push({
				date: currentDate.getDate(), // Get the day number
				shortDay: shortWeekDays[currentDate.getDay()], // Get the short weekday name
			});
		}

		setDays(tempDays);
	};

	useEffect(() => {
		getDays();
	}, [startDate]);

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
					<div
						key={day.date + '' + day.shortDay}
						className={`weekly-day ${day.shortDay === 'Sun' ? 'weekly-sunday' : ''}`}
					>
						<p>{`${day.date} ${day.shortDay}`}</p>
						{hours.map((hour) => (
							<div className='weekly-whole-hour' key={hour}>
								<span className='weekly-top-span' />
								<span className='weekly-bottom-span' />
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
