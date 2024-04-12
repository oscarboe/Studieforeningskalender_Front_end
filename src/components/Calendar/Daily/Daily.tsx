import './Daily.scss';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export default function Daily() {
	return (
		<div id='calendar-daily'>
			<div id='daily-hours'>
				{hours.map((hour) => (
					<p key={hour}>{hour}</p>
				))}
			</div>
			<div id='daily-day'>
				{hours.map((hour) => (
					<div className='daily-whole-hour' key={hour}>
						<span className='daily-top-span' />
						<span className='daily-bottom-span' />
					</div>
				))}
			</div>
		</div>
	);
}
