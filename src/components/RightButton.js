import React from 'react';

class RightButton extends React.component {
  render () {
    return (
      <button className="rightButton" onClick={ this.props.handleRightClick }>
        {'>'}
      </button>
    );
  }
};

export default RightButton;