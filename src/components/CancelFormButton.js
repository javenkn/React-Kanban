import react from 'react';

class CancelFormButton extends React.component {
  render () {
    return (
      <button className="cancelButton" onClick={ this.props.handleCancelClick }>
        { 'Cancel' }
      </button>
    )
  }
};

export default CancelFormButton;