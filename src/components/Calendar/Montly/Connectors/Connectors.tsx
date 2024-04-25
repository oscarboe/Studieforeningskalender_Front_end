import dayjs from 'dayjs';
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
		await new Promise((resolve) => setTimeout(resolve, 10));

		let traversedEvents: HTMLImageElement[] = [];
		let styles: React.SetStateAction<React.CSSProperties[]> = [];
		eventRefs.current.forEach(async (ref) => {
			// If no previous instance of the same event exists, there is no reason to draw connector
			if (!traversedEvents.some((x) => x.classList[0] === ref.classList[0])) {
				traversedEvents.push(ref);
				return;
			}

			let halfConnector: boolean = false;
			let prevRect: DOMRect | undefined;
			let offsetLeft: number = 0;
			let offsetTop: number = 0;
			traversedEvents.forEach((r) => {
				if (r.classList[0] === ref.classList[0]) {
					prevRect = r.getBoundingClientRect();
					halfConnector = dayjs(r.dataset.date).weekday() == 0;

					const parent = r.parentElement;
					if (parent) {
						const transform = window.getComputedStyle(r.parentElement).transform;
						const offsetLeftString = transform.substring(19, transform.indexOf(',', 19));

						const startIndex = transform.lastIndexOf(',') + 1;
						const offsetTopString = transform.substring(startIndex, transform.lastIndexOf(')'));

						offsetLeft = offsetLeftString != 'none' ? Math.ceil(parseFloat(offsetLeftString)) : 0;
						offsetTop = offsetTopString ? parseFloat(offsetTopString) : 0;
					}
				}
			});

			traversedEvents.push(ref);

			if (prevRect) {
				const left = prevRect.right - prevRect.width / 2 - offsetLeft;
				const style: React.CSSProperties = {
					top: `${prevRect.bottom - prevRect.height / 2 - offsetTop}px`,
					left: usePixels ? `${left}px` : `${(left / window.innerWidth) * 100}%`,
				};

				if (halfConnector) {
					style.clipPath = 'inset(0 50% 0 0)';

					const currRect = ref.getBoundingClientRect();

					const newStyle: React.CSSProperties = {
						top: `${currRect.bottom - currRect.height / 2}px`,
						left: usePixels
							? `${currRect.right - currRect.width / 2 - 0.08 * window.innerWidth}px`
							: `${((currRect.right - currRect.width / 2) / window.innerWidth) * 100 - 8}%`,
						clipPath: 'inset(0 0 0 50%)',
					};

					styles.push(newStyle);
				}

				styles.push(style);
			}
		});

		setConnectorStyles(styles);
	};

	const drawSubConnections = ({ origin, offsets }: { origin: DOMRect; offsets: number[] }) => {
		let tempSubConnectors: React.CSSProperties[] = [];
		document.adoptedStyleSheets = [];
		offsets.forEach((offset, i) => {
			const left = origin.left + origin.width / 2 + (1 / 9) * origin.width + offset * origin.width;
			const top = origin.top + origin.height / 2 - 1.05 * origin.height + (1 / 9) * origin.height;

			const a = origin.left + origin.width / 2 - left;
			const b = origin.top + origin.height / 2 - top;
			const c = Math.sqrt(a ** 2 + b ** 2);

			let angle = Math.atan2(b, a);
			if (a < 0 && b < 0) {
				angle += Math.PI; // Adjust for third quadrant
			} else if (a < 0) {
				angle += Math.PI * 2; // Adjust for second quadrant
			}

			const animationName = `animate-${i}`;
			const keyFrameStyle = `@keyframes ${animationName} {
				from {
					left: ${origin.left + origin.width / 2}px;
					top: ${origin.top + origin.height / 2}px;
					width: 0px;
				}
				to {
					left: ${left}px;
					top: ${top}px;
					width: ${c}px;
				}
			}`;

			const styleSheet = new CSSStyleSheet();
			styleSheet.replaceSync(keyFrameStyle);

			document.adoptedStyleSheets.push(styleSheet);

			tempSubConnectors.push({
				left: left + 'px',
				top: top + 'px',
				width: c + 'px',
				zIndex: 5,
				rotate: `${angle}rad`,
				animation: `${animationName} 0.5s linear`,
			});
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
		else setConnectorStyles([]);
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
					<div key={style + '' + i} style={style} />
				))}
			</div>
		</>
	);
};

export default Connectors;
