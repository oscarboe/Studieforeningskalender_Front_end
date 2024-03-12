import React from 'react';
import PopularEvent from './PopularEvent';
import './PopularEventsWrapper.css';

class PopularEventsWrapper extends React.Component {
  render() {
    return (
      <div className='popular-events-wrapper'>
        <PopularEvent
          imageUrl='https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2013/07/ar-12.jpg?ssl=1'
          text='Event 1 is awesome please join it'
        />
        <PopularEvent
          imageUrl='https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&w=600'
          text='Event 2 is awesome please join it'
        />
        <PopularEvent
          imageUrl='https://images.pexels.com/photos/547119/pexels-photo-547119.jpeg?auto=compress&cs=tinysrgb&w=600'
          text='Event 3 is awesome please join it'
        />
      </div>
    );
  }
}

export default PopularEventsWrapper;
