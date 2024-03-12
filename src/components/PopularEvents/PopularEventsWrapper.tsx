import React from 'react';
import PopularEvent from './PopularEvent';
import './PopularEventsWrapper.css';
import { ExampleEvents } from '../../../public/ExampleData';

class PopularEventsWrapper extends React.Component {
  render() {
    return (
      <div className='popular-events-wrapper'>
        <PopularEvent eventData={ExampleEvents[0]} swap={true} />
        <PopularEvent eventData={ExampleEvents[1]} swap={false} />
        <PopularEvent eventData={ExampleEvents[2]} swap={true} />
      </div>
    );
  }
}

export default PopularEventsWrapper;
