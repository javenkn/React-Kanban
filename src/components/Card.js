import react from 'react';
import OptionButtons from '../components/OptionButtons.js';
import RightButton from '../components/RightButton.js';
import LeftButton from '../components/LeftButton.js';

class Card extends React.component {
  getInitialState () {
    return {
      showOptions: false
    };
  }
  delete () {
    this.props.removeCard(this.props.id);
  }
  moveRight () {
    this.props.changedStatus(this.props.id, this.props.status+1);
  }
  moveLeft () {
    this.props.changedStatus(this.props.id, this.props.status-1);
  }
  toggleOptions () {
    this.setState({ showOptions: !this.state.showOptions });
  }
  render () {
    let moveButtons;
    switch(this.props.status){
      case 1:
        moveButtons = <RightButton handleRightClick={ this.moveRight } />;
        break;
      case 2:
        moveButtons = <div><LeftButton handleLeftClick={ this.moveLeft } /><RightButton handleRightClick={ this.moveRight } /></div>;
        break;
      case 3:
        moveButtons = <LeftButton handleLeftClick={ this.moveLeft } />;
        break;
    }
    return (
      <div className="card">
        <div className="content" onClick={ this.toggleOptions }>
          <div className="cardTitle">
            { this.props.title }
          </div>
          <div className="cardCreator">
            { 'Created by: ' + this.props.creator }
          </div>
          <div className="cardAssigned">
            { 'Assigned to: ' + this.props.assigned }
          </div>
          <div className="cardPriority">
            { 'Priority: ' + this.props.priority }
          </div>
        </div>
        { this.state.showOptions ? <OptionButtons handleDeleteClick={ this.delete }/> : null }
        { this.props.status ? moveButtons : null }
      </div>
    )
  }
}

export default Card;