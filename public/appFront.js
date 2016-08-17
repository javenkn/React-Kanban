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
    const cardNodes = this.props.data.map(function (card, index) {
      const userObj = card.Users;
      const usersAssignedToCard = userObj.map(function (user) {
        return ' ' + user.first_name;
      });
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
    const columnTitles = ['Queue', 'In Progress', 'Done'];
    return (
      <div className="kanbanBoard">
      {columnTitles.map(function (title, index) {
        return (
          <div className="column" key={index}>
            <div className="columnTitle">
              {title}
            </div>
            {cardNodes}
          </div>
        )
      })}
      </div>
    );
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
      <Column data={this.state.data} />
    )
  }
});

ReactDOM.render(
  <KanbanBoard url="/kanban/cards" pollInterval={10000} />,
  document.getElementById('app')
);