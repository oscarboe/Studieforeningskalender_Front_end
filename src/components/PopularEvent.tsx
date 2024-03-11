import React from 'react';
import './PopularEvent.css';

type PopularEventProps = {
  imageUrl: string;
  text: string;
};

class PopularEvent extends React.Component<PopularEventProps> {
  render() {
    return (
      <div>
        <div>
          <img src={this.props.imageUrl} alt='Event' />
        </div>
        <div>{this.props.text}</div>
      </div>
    );
  }
}

export default PopularEvent;
