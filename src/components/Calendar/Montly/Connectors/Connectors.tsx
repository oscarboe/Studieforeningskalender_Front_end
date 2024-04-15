import { EventDto } from '../../Calendar';
import './Connectors.scss';
import { useEffect, useState } from 'react';

interface props {
	eventRefs: React.MutableRefObject<HTMLImageElement[]>;
	events: EventDto[];
}

const Connectors = ({ eventRefs, events }: props) => {
	const [connectorStyles, setConnectorStyles] = useState<React.CSSProperties[]>([]);

	const drawConnections = async () => {
		// Remove all connectors before drawing new connectors
		const eventConnectors = document.getElementsByClassName('event-connector');
		for (var i = eventConnectors.length - 1; i >= 0; i--) eventConnectors[i].remove();

		// Wait for a bit for other stuff to resolve
		await new Promise((resolve) => setTimeout(resolve, 50));

		let traversedEvents: HTMLImageElement[] = [];
		let drawnFrom: HTMLImageElement[] = [];
		eventRefs.current.forEach(async (ref) => {
			// If no previous instance of the same event exists, there is no reason to draw connector
			if (!traversedEvents.some((x) => x.classList[0] === ref.classList[0])) {
				traversedEvents.push(ref);
				return;
			}

			let prevRect: DOMRect | undefined;
			traversedEvents.forEach((r) => {
				if (r.classList[0] === ref.classList[0] && !drawnFrom.some((x) => x.classList[1] === r.classList[1])) {
					drawnFrom.push(r);
					prevRect = r.getBoundingClientRect();
				}
			});

			traversedEvents.push(ref);

			if (prevRect) {
				const style: React.CSSProperties = {
					top: `${((prevRect.bottom - prevRect.height / 2) / window.innerHeight) * 100}%`,
					left: `${((prevRect.right - prevRect.width / 2) / window.innerWidth) * 100}%`,
				};

				setConnectorStyles((connectorStyle) => [...connectorStyle, style]);
			}
		});
	};

	useEffect(() => {
		if (events.length > 0) drawConnections();
	}, [events]);

	return (
		<div id='connectors'>
			{connectorStyles.map((style, i) => (
				<svg style={style} key={style.left + '' + i} className='event-connector' xmlns='http://www.w3.org/2000/svg'>
					<line x1='0%' y1='50%' x2='46.5%' y2='50%' stroke='blue' strokeWidth='2' />
					<circle r='3%' cx='50%' cy='50%' fill='none' stroke='blue' strokeWidth='2' />
					<line x2='100%' y2='50%' x1='53.5%' y1='50%' stroke='blue' strokeWidth='2' />
				</svg>
			))}
		</div>
	);
};

export default Connectors;
