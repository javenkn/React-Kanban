import react from 'react';
import Column from '../components/Column.js';
import CreateButton from '../components/CreateButton.js';
import CardForm from '../components/CardForm.js';

class KanbanBoard extends React.component {
  loadCardsFromServer () {
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
  }
  handleCardCreate (card) {
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
  }
  updateCardStatus (id, newStatusId) {
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
  }
  handleDeleteCard (id) {
    $.ajax({
      url: this.props.url + '/' + id,
      dataType: 'json',
      type: 'DELETE',
      data: { idToDelete: id },
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  toggleForm () {
    this.setState({ showForm: !this.state.showForm });
  }
  getInitialState () {
    return { data: [],
             showForm: false
          };
  }
  componentDidMount () {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, this.props.pollInterval);
  }
  render () {
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
};

export default KanbanBoard;