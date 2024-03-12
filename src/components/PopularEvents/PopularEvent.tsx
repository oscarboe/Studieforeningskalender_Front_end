import React from 'react';
import './PopularEvent.css';
import '../Button.css';

type PopularEventProps = {
  imageUrl: string;
  text: string;
};

class PopularEvent extends React.Component<PopularEventProps> {
  render() {
    return (
      <div className='PopularEvent'>
        <img className='img' src={this.props.imageUrl} alt='Event' />
        <div className='h1'>
          <div className='text'>{this.props.text}</div>
          <button className='button-28' style={{ width: '50%',  }}>Se Mere</button>
        </div>
      </div>
    );
  }
}

export default PopularEvent;
