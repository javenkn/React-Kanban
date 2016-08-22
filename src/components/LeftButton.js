import React from 'react';

class LeftButton extends React.component {
  render () {
    return (
      <button className="leftButton" onClick={ this.props.handleLeftClick }>
        {'<'}
      </button>
    );
  }
};

export default LeftButton;