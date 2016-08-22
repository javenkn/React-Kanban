const LeftButton = React.createClass({
  render: function () {
    return (
      <button className="leftButton" onClick={ this.props.handleLeftClick }>
        {'<'}
      </button>
    );
  }
});

const RightButton = React.createClass({
  render: function () {
    return (
      <button className="rightButton" onClick={ this.props.handleRightClick }>
        {'>'}
      </button>
    );
  }
});

const OptionButtons = React.createClass({
  render: function () {
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
});

const CancelFormButton = React.createClass({
  render: function () {
    return (
      <button className="cancelButton" onClick={ this.props.handleCancelClick }>
        { 'Cancel' }
      </button>
    )
  }
});

const CardForm = React.createClass({
  getInitialState: function () {
    return {title: '', priority: '', created_by: '', assigned_to: ''}
  },
  handleTitleChange: function (e) {
    this.setState({title: e.target.value});
  },
  handlePriorityChange: function (e) {
    this.setState({priority: e.target.value});
  },
  handleCreatedChange: function (e) {
    this.setState({created_by: e.target.value});
  },
  handleAssignChange: function (e) {
    this.setState({assigned_to: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    let title = this.state.title.trim();
    let priority = this.state.priority.trim();
    let created_by = this.state.created_by.trim();
    let assigned_to = this.state.assigned_to.trim();
    if(!title || !priority || !created_by || !assigned_to) {
      return;
    } else if(isNaN(parseInt(priority))){
      return;
    } else {
      this.props.onCardSubmit({title: title, priority: priority, created_by: created_by, assigned_to: assigned_to})
      this.setState({title: '', priority: '', created_by: '', assigned_to: ''})
    }
  },
  render: function () {
    return (
      <div className="createCard">
        <h1>
          Create a card
        </h1>
        <form className="cardForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <input
            type="text"
            placeholder="Priority (Rate from 1 (lowest) - 100 (highest/blocker))"
            value={this.state.priority}
            onChange={this.handlePriorityChange}
          />
          <input
            type="text"
            placeholder="Created By"
            value={this.state.created_by}
            onChange={this.handleCreatedChange}
          />
          <input
            type="text"
            placeholder="Assigned To (seperate names with commas)"
            value={this.state.assigned_to}
            onChange={this.handleAssignChange}
          />
          <input type="submit" value="Create" />
        </form>
        <CancelFormButton handleCancelClick={this.props.toggleStatus}/>
      </div>
    )
  }
})

const CreateButton = React.createClass({
  render: function () {
    return (
      <button className="createButton" onClick={this.props.handleClick}>
        { '+' }
      </button>
    )
  }
});

const Card = React.createClass({
  getInitialState: function () {
    return {
      showOptions: false
    }
  },
  delete: function () {
    this.props.removeCard(this.props.id);
  },
  moveRight: function () {
    this.props.changedStatus(this.props.id, this.props.status+1);
  },
  moveLeft: function () {
    this.props.changedStatus(this.props.id, this.props.status-1);
  },
  toggleOptions: function () {
    this.setState({ showOptions: !this.state.showOptions });
  },
  render: function () {
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
});

const Column = React.createClass({
  render: function () {
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
});

const KanbanBoard = React.createClass({
  loadCardsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCardCreate: function (card) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: card,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  updateCardStatus: function (id, newStatusId) {
    $.ajax({
      url: this.props.url + '/' + id,
      dataType: 'json',
      type: 'PUT',
      data: { newStatus: newStatusId },
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDeleteCard: function (id) {
    $.ajax({
      url: this.props.url + '/' + id,
      dataType: 'json',
      type: 'DELETE',
      data: { idToDelete: id },
      success: function (data) {
        console.log(data)
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  toggleForm: function () {
    this.setState({ showForm: !this.state.showForm });
  },
  getInitialState: function () {
    return { data: [],
             showForm: false
          };
  },
  componentDidMount: function () {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="kanbanBoard">
        <CreateButton handleClick={ this.toggleForm } />
        {this.state.showForm ? <CardForm onCardSubmit={ this.handleCardCreate } toggleStatus={ this.toggleForm } /> : null}
        <Column data={this.state.data}
                title="Queue"
                status={1}
                moveCard={ this.updateCardStatus }
                deleteCard={this.handleDeleteCard}
        />
        <Column data={this.state.data}
                title="In Progress"
                status={2}
                moveCard={ this.updateCardStatus }
                deleteCard={this.handleDeleteCard}
        />
        <Column data={this.state.data}
                title="Done"
                status={3}
                moveCard={ this.updateCardStatus }
                deleteCard={this.handleDeleteCard}
        />
      </div>
    )
  }
});

ReactDOM.render(
  <KanbanBoard url="/kanban/cards" pollInterval={10000} />,
  document.getElementById('app')
);