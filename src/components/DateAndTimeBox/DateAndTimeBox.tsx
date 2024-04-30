import { PiCalendarBlankLight } from 'react-icons/pi';
import './DateAndTimeBox.scss';
import { Event } from '../../pages/HomePage/HomePage';
import dayjs from 'dayjs';
import 'add-to-calendar-button';

const DateAndTimeBox = ({ event }: { event: Event }) => {
	const getTimeString = (time: number): string => {
		if (time < 10) return '0' + time;
		else return time + '';
	};

	const getStart = (): string => {
		if (!event?.startTime) return '';
		const startTime = new Date(event.startTime);

		const startDate = startTime.getDate();
		const startMonth = dayjs.monthsShort()[dayjs(startTime).month()];
		const startYear = startTime.getFullYear();
		const startHour = getTimeString(startTime.getHours() ?? 0);
		const startMinutes = getTimeString(startTime.getMinutes() ?? 0);

		return `${startDate} ${startMonth} ${startYear} ${startHour}:${startMinutes}`;
	};

	const getEnd = (): string => {
		if (!event?.endTime) return '';
		const endTime = new Date(event.endTime);

		const endDate = endTime.getDate();
		const endMonth = dayjs.monthsShort()[dayjs(endTime).month()];
		const endYear = endTime.getFullYear();
		const endHour = getTimeString(endTime.getHours() ?? 0);
		const endMinutes = getTimeString(endTime.getMinutes() ?? 0);

		return `${endDate} ${endMonth} ${endYear} ${endHour}:${endMinutes}`;
	};

	return (
		<div className='date-and-time-box'>
			<p>Calendar</p>
			<div className='date-and-time'>
				<PiCalendarBlankLight size={40} className='logo' />
				<div className='times'>
					<p>Starts: {getStart()}</p>
					<p>Ends: {getEnd()}</p>
				</div>
			</div>
		</div>
	);
};

export default DateAndTimeBox;
