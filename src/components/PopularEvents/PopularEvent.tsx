import React from 'react';
import './PopularEvent.css';
import '../Button.css';
import { cardInfo } from '../../../public/ExampleData';

type PopularEventProps = {
  eventData: cardInfo;
  swap?: boolean;
};

class PopularEvent extends React.Component<PopularEventProps> {
  render() {
    return (
      <div
        className='PopularEvent'
        style={{ flexDirection: this.props.swap ? 'row' : 'row-reverse' }}
      >
        <img className='img' src={this.props.eventData.image} alt='Event' />
        <div className='h1'>
          <div className='header'>{this.props.eventData.eventName}</div>
          <div className='description'>{this.props.eventData.description}</div>
          <button className='button-28' style={{ width: '50%' }}>
            Se Mere
          </button>
        </div>
      </div>
    );
  }
}

export default PopularEvent;
