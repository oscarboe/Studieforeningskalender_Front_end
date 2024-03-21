import React from 'react';
import './PopularEvent.css';
import { cardInfo } from '../../../public/ExampleData';

type PopularEventProps = {
	eventData: {
		__typename?: 'EventDto' | undefined;
		id: string;
		title: string;
		description: string;
		image: string;
	};
	swap?: boolean;
};

export default function PopularEvent({ eventData, swap }: PopularEventProps) {
	return (
		<div className='PopularEvent' style={{ flexDirection: swap ? 'row' : 'row-reverse' }}>
			<img className='img' src={`data:image/png;base64,${eventData.image}`} alt='Event' />
			<div className='h1'>
				<div id='textPart'>
					<div className='title'>{eventData.title}</div>
					<div className='description'>{eventData.description}</div>
				</div>
				<button id='eventButton'>Se Mere</button>
			</div>
		</div>
	);
}
