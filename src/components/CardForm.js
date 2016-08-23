import React from 'react';
import CancelFormButton from '../components/CancelFormButton.js';

class CardForm extends React.component {
  getInitialState () {
    return {title: '', priority: '', created_by: '', assigned_to: ''}
  }
  handleTitleChange (e) {
    this.setState({title: e.target.value});
  }
  handlePriorityChange (e) {
    this.setState({priority: e.target.value});
  }
  handleCreatedChange (e) {
    this.setState({created_by: e.target.value});
  }
  handleAssignChange (e) {
    this.setState({assigned_to: e.target.value});
  }
  handleSubmit (e) {
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
  }
  render () {
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
};

export default CardForm;