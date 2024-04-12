import { useEffect, useRef, useState } from 'react';
import './Monthly.scss';
import dayjs from 'dayjs';
import { EventDto } from '../Calendar';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const shortWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Euriope/Copenhagen');

interface props {
	startDate: Date;
	endDate: Date;
	events: EventDto[];
}

interface day {
	date: number;
	inCurrentMonth: boolean;
	dayEvents: EventDto[];
}

export default function Monthly({ startDate, endDate, events }: props) {
	const [weeks, setWeeks] = useState<day[][]>([]);
	const eventRefs = useRef<HTMLImageElement[]>([]);

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

	const getRef = (el: HTMLImageElement | null) => {
		if (el) {
			eventRefs.current.push(el);
		}
	};

	const drawConnections = async () => {
		// Remove all connectors before drawing new connectors
		const eventConnectors = document.getElementsByClassName('event-connector');
		for (var i = eventConnectors.length - 1; i > 0; i--) eventConnectors[i].remove();

		// Wait for a bit for other stuff to resolve
		await new Promise((resolve) => setTimeout(resolve, 100));
		const connectors = document.getElementById('connectors');

		let traversedEvents: HTMLImageElement[] = [];
		eventRefs.current.forEach(async (ref) => {
			// If no previous instance of the same event exists, there is no reason to draw connector
			if (!traversedEvents.some((x) => x.className === ref.className)) {
				traversedEvents.push(ref);
				return;
			}

			const connector = document.createElement('div');
			connector.className = 'event-connector';

			var lastRef;
			traversedEvents.forEach((r) => {
				if (r.className === ref.className) lastRef = r;
			});

			const prevRect = lastRef.getBoundingClientRect();
			const currRect = ref.getBoundingClientRect();

			connector.style.position = 'fixed';
			connector.style.top = `${((prevRect.bottom - prevRect.height / 2) / window.innerHeight) * 100}%`;
			connector.style.left = `${((prevRect.right - prevRect.width / 2) / window.innerWidth) * 100}%`;
			connector.style.width = `${((currRect.left - prevRect.right + currRect.width) / window.innerWidth) * 100}%`;
			connector.style.borderBottom = '2px solid red';
			connector.style.zIndex = '5';

			connectors.appendChild(connector);
		});
	};

	useEffect(() => {
		eventRefs.current = [];
		if (events.length > 0) drawConnections();
	}, [events]);

	useEffect(() => {
		eventRefs.current = [];
		getWeeks(startDate, endDate);
	}, [startDate, events]);

	return (
		<div id='calendar-month'>
			<div id='connectors'></div>
			<div id='month-weekDays'>
				{shortWeekDays.map((dayName) => (
					<p key={dayName}>{dayName}</p>
				))}
			</div>
			<div id='weeks'>
				{weeks.map((week, i) => (
					<div className='week' key={week.toString() + i}>
						{week.map((day) => (
							<div key={day.date + '' + day.inCurrentMonth} className='day'>
								<p className={!day.inCurrentMonth ? 'outSideMonth' : ''}>{day.date}</p>
								<div className='monthly-day-events'>
									{day.dayEvents.map((e) => (
										<img src={`data:image/png;base64,${e.smallImage}`} key={e.id} ref={getRef} className={e.id} />
									))}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
