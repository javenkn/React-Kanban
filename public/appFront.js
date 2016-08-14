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
        <Card key={index} title={ card.title }>{ card.priority }</Card>
      )
    });
    return (
      <div className="column">
        Column
        { cardNodes }
      </div>
    )
  }
});

const KanbanBoard = React.createClass({
  render: function () {
    return (
      <div className="kanbanBoard">
        <h1>Kanban Board!</h1>
        <Column />
        <Column />
        <Column />
      </div>
    )
  }
});

ReactDOM.render(
  <KanbanBoard />,
  document.getElementById('app')
);