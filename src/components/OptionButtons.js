import React from 'react';

class OptionButtons extends React.component {
  render () {
    return (
      <div className="optionButtons">
        <button className="editButton">
          {'Edit'}
        </button>
        <button className="deleteButton" onClick={ this.props.handleDeleteClick }>
          {'Delete'}
        </button>
      </div>
    )
  }
};

export default OptionButtons;