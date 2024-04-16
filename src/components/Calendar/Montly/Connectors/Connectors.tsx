import useThrottle from '../../../../Helpers/ThrottleHelper';
import { EventDto } from '../../Calendar';
import './Connectors.scss';
import { useEffect, useState } from 'react';

interface props {
	eventRefs: React.MutableRefObject<HTMLImageElement[]>;
	events: EventDto[];
	subConnData: { origin: DOMRect; offsets: number[] } | null;
}

const Connectors = ({ eventRefs, events, subConnData }: props) => {
	const [connectorStyles, setConnectorStyles] = useState<React.CSSProperties[]>([]);
	const [subConnectors, setSubConnectors] = useState<React.CSSProperties[]>([]);
	const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

	const drawConnections = async (usePixels: boolean = false) => {
		// Wait for a bit for other stuff to resolve
		await new Promise((resolve) => setTimeout(resolve, 50));

		let traversedEvents: HTMLImageElement[] = [];
		let styles: React.SetStateAction<React.CSSProperties[]> = [];
		eventRefs.current.forEach(async (ref) => {
			// If no previous instance of the same event exists, there is no reason to draw connector
			if (!traversedEvents.some((x) => x.classList[0] === ref.classList[0])) {
				traversedEvents.push(ref);
				return;
			}

			let prevRect: DOMRect | undefined;
			traversedEvents.forEach((r) => {
				if (r.classList[0] === ref.classList[0]) {
					prevRect = r.getBoundingClientRect();
				}
			});

			traversedEvents.push(ref);

			if (prevRect) {
				const style = {
					top: `${prevRect.bottom - prevRect.height / 2}px`,
					left: usePixels
						? `${prevRect.right - prevRect.width / 2}px`
						: `${((prevRect.right - prevRect.width / 2) / window.innerWidth) * 100}%`,
				};

				styles.push(style);
			}
		});

		setConnectorStyles(styles);
	};

	const drawSubConnections = ({ origin, offsets }: { origin: DOMRect; offsets: number[] }) => {
		console.log(origin, offsets);

		let tempSubConnectors: React.CSSProperties[] = [];
		offsets.forEach((offset) => {
			const left = origin.left + origin.width / 2 + offset * origin.width;
			const top = origin.bottom + origin.width / 2 - 1.05 * origin.width;
			const width = Math.abs(origin.left - left);

			tempSubConnectors.push({ left: left + 'px', top: top + 'px', width: width + 'px' });
		});
		setSubConnectors(tempSubConnectors);
	};

	const handleResize = useThrottle(() => {
		if (window.innerWidth < 880 || window.innerHeight != dimensions.height) {
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
			drawConnections(true);
		} else if (dimensions.width < 880 && window.innerWidth >= 880) {
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
			drawConnections();
		}
	}, 50);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	useEffect(() => {
		if (events.length > 0) drawConnections();
	}, [events]);

	useEffect(() => {
		if (subConnData) drawSubConnections(subConnData);
	}, [subConnData]);

	return (
		<>
			<div id='connectors'>
				{connectorStyles.map((style, i) => (
					<svg style={style} key={style.left + '' + i} className='event-connector' xmlns='http://www.w3.org/2000/svg'>
						<line x1='0%' y1='50%' x2='46.5%' y2='50%' stroke='blue' strokeWidth='2' />
						<circle r='3%' cx='50%' cy='50%' fill='none' stroke='blue' strokeWidth='2' />
						<line x2='100%' y2='50%' x1='53.5%' y1='50%' stroke='blue' strokeWidth='2' />
					</svg>
				))}
			</div>
			<div id='sub-connectors'>
				{subConnectors.map((style, i) => (
					<div key={style + '' + i} style={{ ...style, border: 'solid black 2px' }}></div>
				))}
			</div>
		</>
	);
};

export default Connectors;
