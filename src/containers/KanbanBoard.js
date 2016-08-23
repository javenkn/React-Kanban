import React from 'react';
// import Column from '../components/Column.js';
// import CreateButton from '../components/CreateButton.js';
// import CardForm from '../components/CardForm.js';

class KanbanBoard extends React.Component {
  constructor (props) {
    super();
    this.state = {
      data: [],
      showForm: false
    };
    this.loadCardsFromServer = this.loadCardsFromServer.bind(this);
  }
  loadCardsFromServer () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ data: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
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
  componentDidMount () {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, this.props.pollInterval);
  }
  render () {
    return (
      <div className="kanbanBoard">
      </div>
    )
  }
};

export default KanbanBoard;