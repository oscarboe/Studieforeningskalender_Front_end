import './Day.scss';
import { memo, useState } from 'react';
import { day } from '../Monthly';
import { Fade, Modal } from '@mui/material';
import EventCard from '../../../EventCard/EventCard';
import { Event } from '../../../../pages/HomePage/HomePage';

const Day = ({ day, setRef }: { day: day; setRef: (el: HTMLImageElement | null) => void }) => {
	const [hover, setHover] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<Event>({});

	const getXTranslate = (index: number): number => {
		const length = day.dayEvents.length;
		const middle = (length - 1) / 2;
		const translationUnit = 100;

		if (length % 2 !== 0) {
			return (index - middle) * translationUnit;
		} else {
			if (index < middle) {
				return (index - middle) * translationUnit + translationUnit / 2;
			} else {
				return (index - middle) * translationUnit - translationUnit / 2;
			}
		}
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

	return (
		<div className='day'>
			<p className={!day.inCurrentMonth ? 'outSideMonth' : ''}>{day.date}</p>
			{day.dayEvents.length > 0 ? (
				<div
					className={`monthly-day-events${day.dayEvents.length > 1 ? ' stacked-day' : ''}`}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					{day.dayEvents.map((e, i) => (
						<div style={getStyle(i)} key={e.id}>
							<img
								src={`data:image/png;base64,${e.smallImage}`}
								ref={setRef}
								className={`${e.id} ${Math.random()}${day.dayEvents.length > 1 ? ' stacked' : ''}`}
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
			<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition className='modal-for-day'>
				<Fade in={open}>
					<div className='monthly-day-event'>
						<EventCard event={{ ...selectedEvent, mediumImage: selectedEvent.smallImage }} />
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default memo(Day);
