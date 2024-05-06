import { memo } from 'react';
import { day } from '../Weekly';
import './Day.scss';
import DayEvents from '../../DayEvents/DayEvents';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const Day = ({ day }: { day: day }) => {
	return (
		<div className={`weekly-day ${day.shortDay === 'Sun' ? 'weekly-sunday' : ''}`}>
			{day.shortDay && day.date ? <p>{`${day.date} ${day.shortDay}`}</p> : ''}
			{hours.map((hour) => (
				<div className='weekly-whole-hour' key={hour}>
					<span className='weekly-top-span' />
					<span className='weekly-bottom-span' />
				</div>
			))}
			<DayEvents day={day} />
		</div>
	);
};

export default memo(Day);
