import './CalendarPage.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar from '../../components/Calendar/Calendar';

export default function CalendarPage() {
	return (
		<div id='calendar-page'>
			{/* <h1>The Calendar</h1> */}
			<Calendar />
		</div>
	);
}
