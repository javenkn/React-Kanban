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
    console.log(cardNodes);
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
  render: function () {
    return (
      <Column />
    )
  }
});

ReactDOM.render(
  <KanbanBoard />,
  document.getElementById('app')
);