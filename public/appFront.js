const Create = React.createClass({
  render: function () {
    return (
      <button className="createButton">
        { '+' }
      </button>
    )
  }
});

const Card = React.createClass({
  render: function () {
    return (
      <div className="card">
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
    )
  }
});

const Column = React.createClass({
  render: function () {
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
      const usersAssignedToCard = userObj.map(function (user) {
        return ' ' + user.first_name;
      });
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
          key={ index }
          title={ card.title }
          creator={ card.created_by }
          assigned={ usersAssignedToCard }
          priority={ card.priority }
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
});

const KanbanBoard = React.createClass({
  loadCardsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        console.log('SUCCESS!');
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="kanbanBoard">
        <Create />
        <Column data={this.state.data} title="Queue" status={1} />
        <Column data={this.state.data} title="In Progress" status={2} />
        <Column data={this.state.data} title="Done" status={3} />
      </div>
    )
  }
});

ReactDOM.render(
  <KanbanBoard url="/kanban/cards" pollInterval={10000} />,
  document.getElementById('app')
);