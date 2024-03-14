import React from 'react';
import './PopularEvent.css';
import { cardInfo } from '../../../public/ExampleData';

type PopularEventProps = {
	eventData: cardInfo;
	swap?: boolean;
};

class PopularEvent extends React.Component<PopularEventProps> {
	render() {
		return (
			<div className='PopularEvent' style={{ flexDirection: this.props.swap ? 'row' : 'row-reverse' }}>
				<img className='img' src={this.props.eventData.image} alt='Event' />
				<div className='h1'>
					<div id='textPart'>
						<div className='title'>{this.props.eventData.eventName}</div>
						<div className='description'>{this.props.eventData.description}</div>
					</div>
					<button id='eventButton'>Se Mere</button>
				</div>
			</div>
		);
	}
}

export default PopularEvent;
