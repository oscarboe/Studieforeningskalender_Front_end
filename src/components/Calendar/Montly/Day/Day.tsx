import './Day.scss';
import { memo, useState } from 'react';
import { day } from '../Monthly';
import { Event } from '../../../../pages/HomePage/HomePage';
import dayjs from 'dayjs';
import DayEventModal from '../../DayEvents/DayEventModal/DayEventModal';

interface props {
	setSubConnectors: (origin: DOMRect, offsets: number[]) => void;
	day: day;
	setRef: (el: HTMLImageElement | null) => void;
	date: Date;
}

const Day = ({ day, setRef, setSubConnectors, date }: props) => {
	const [hover, setHover] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<Event>({});

	const getXTranslate = (index: number): number => {
		const length = day.dayEvents.length;
		const middle = (length - 1) / 2;
		const translationUnit = 100;

		return (index - middle) * translationUnit;
	};

	const getStyle = (index: number): React.CSSProperties => {
		if (hover && day.dayEvents.length > 1) {
			return {
				transform: `translate(${getXTranslate(index)}%, -105%)`,
				opacity: 1,
				transition: 'transform 0.5s, opacity 0.1s, padding 0.5s',
			};
		} else {
			return { transition: 'transform 0.3s, padding 0.3s, opacity 0.5s' };
		}
	};

	const onHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (day.dayEvents.length > 1) {
			setHover(true);

			const xOffsets: number[] = day.dayEvents
				.map((e, i) => {
					if (dayjs(e.endTime).isAfter(e.startTime, 'day')) return getXTranslate(i) / 100;
					else return 0;
				})
				.filter((num) => num != 0);

			const origin = e.currentTarget.getBoundingClientRect();

			setSubConnectors(origin, xOffsets);
		}
	};

	const onUnHover = () => {
		setHover(false);
		setSubConnectors(new DOMRect(), []);
	};

	return (
		<div className='day'>
			<p className={!day.inCurrentMonth ? 'outSideMonth' : ''}>{day.date}</p>
			{day.dayEvents.length > 0 ? (
				<div
					className={`monthly-day-events${day.dayEvents.length > 1 ? ' stacked-day' : ''}`}
					onMouseEnter={onHover}
					onMouseLeave={onUnHover}
				>
					{day.dayEvents.map((e, i) => (
						<div style={getStyle(i)} key={e.id}>
							<img
								src={`data:image/png;base64,${e.image}`}
								ref={setRef}
								className={`${e.id} ${Math.random()}${day.dayEvents.length > 1 ? ' stacked' : ''}`}
								data-date={date}
								onClick={() => {
									setOpen(true);
									setSelectedEvent(e);
								}}
							/>
						</div>
					))}
				</div>
			) : (
				<></>
			)}
			<DayEventModal event={selectedEvent} open={open} setOpen={setOpen} imageSize='small' />
		</div>
	);
};

export default memo(Day);
