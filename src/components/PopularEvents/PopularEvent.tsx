import React from 'react';
import './PopularEvent.css';
import '../Button.css';

type PopularEventProps = {
  imageUrl: string;
  text: string;
  swap?: boolean;
};

class PopularEvent extends React.Component<PopularEventProps> {
  render() {
    return (
      <div className='PopularEvent' style={{ flexDirection: this.props.swap ? 'row' : 'row-reverse' }}>
        <img className='img' src={this.props.imageUrl} alt='Event' />
        <div className='h1'>
          <div className='text'>{this.props.text}</div>
          <button className='button-28' style={{ width: '50%' }}>Se Mere</button>
        </div>
      </div>
    );
  }
}

export default PopularEvent;