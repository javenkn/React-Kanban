import react from 'react';
import Card from '../components/Card.js';

class Column extends React.component {
  render () {
    const deleteGetter = this.props.deleteCard;
    const moveCard = this.props.moveCard;
    const statusOfColumn = this.props.status;
    const organizedCardNodes = this.props.data.filter(function (card, index) {
      return card.status === statusOfColumn;
    })
    .sort(function (cardA, cardB) { // put highest priority on top
      if(cardA.priority > cardB.priority) {
        return -1;
      } else if (cardA.priority < cardB.priority) {
        return 1;
      }
      return 0;
    })
    .map(function (card, index) {
      const userObj = card.Users;
      switch(true) {
        case (card.priority === 100):
          card.priority = 'Blocker';
          break;
        case (card.priority >= 80 && card.priority <= 99):
          card.priority = 'High';
          break;
        case (card.priority >= 50 && card.priority < 80):
          card.priority = 'Medium';
          break;
        case (card.priority > 0):
          card.priority = 'Low';
          break;
      }
      return (
        <Card
          id={ card.id }
          key={ index }
          title={ card.title }
          creator={ card.created_by }
          assigned={ card.assigned_to }
          priority={ card.priority }
          status={ card.status }
          changedStatus={ moveCard }
          removeCard={ deleteGetter }
        />
      )
    });
    return (
      <div className="column">
        <div className="columnTitle">
          { this.props.title }
        </div>
          { organizedCardNodes }
      </div>
    )
  }
};

export default Column;