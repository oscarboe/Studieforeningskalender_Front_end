import './Day.scss';
import { memo, useState } from 'react';
import { day } from '../Monthly';

const Day = ({ day, setRef }: { day: day; setRef: (el: HTMLImageElement | null) => void }) => {
	const [hover, setHover] = useState(false);

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
						<div style={getStyle(i)}>
							<img
								src={`data:image/png;base64,${e.smallImage}`}
								key={e.id}
								ref={setRef}
								className={`${e.id}${day.dayEvents.length > 1 ? ' stacked' : ''}`}
							/>
						</div>
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default memo(Day);
