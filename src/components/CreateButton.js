import react from 'react';

class CreateButton extends React.component{
  render () {
    return (
      <button className="createButton" onClick={this.props.handleClick}>
        { '+' }
      </button>
    )
  }
};