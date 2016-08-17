const Card = React.createClass({
  render: function () {
    return (
      <div className="card">
        <h2 className="cardTitle">
          { this.props.title }
        </h2>
      </div>
    )
  }
});

const data = [
  {
    id: 1,
    title: 'Finish work',
    priority: 'low',
    status: 'Queue',
    createdBy: 'Bob',
    assignedTo: 'Billy'
  },
  {
    id: 2,
    title: 'Finish assignment',
    priority: 'low',
    status: 'Queue',
    createdBy: 'Billy',
    assignedTo: 'Bob'
  },
  {
    id: 3,
    title: 'Finish task',
    priority: 'low',
    status: 'Queue',
    createdBy: 'Will',
    assignedTo: 'Billy'
  }
];



const Column = React.createClass({
  render: function () {
    const cardNodes = data.map(function (card, index) {
      return (
        <Card key={index} title={ card.title } />
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
            { cardNodes }
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
        console.log(data);
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