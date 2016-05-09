import * as React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as expensesActions from '../actions/expenses';

class ExpenseDetails extends React.Component {

  constructor() {
    super()
    this.state = {
        description: '',
        amount: 0,
        comment: ''
    }
  }

  componentWillReceiveProps(nextProps) {

      this.setState({
              description: nextProps.description,
              amount: nextProps.amount,
              comment: nextProps.comment,
          }
      );
  }

  componentDidMount() {

    this.props.loadExpenseById(this.props.params.id)
  }

  handleSave(event) {
    event.preventDefault()

    var data = {
        description: this.state.description,
        amount: this.state.amount,
        comment: this.state.comment
    }

    if(this.props.params.id)
        this.props.updateExpense(this.props.params.id, data)
    else
        this.props.addExpense(data)
  }

  handleDelete(event) {
    event.preventDefault()

    this.props.deleteExpense(this.props.params.id)
  }

  render() {

    return (
      <div className="container">
        <div className="page-header">
          <h1>Expense Details</h1>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
                className="form-control"
                id="description"
                placeholder="Description"
                onChange={() => this.setState({description: this.state.description})}
                value={this.state.description} />
          </div>
          <div class="form-group">
            <label htmlFor="amount">Amount</label>
            <input
                className="form-control"
                id="amount"
                placeholder="0.00"
                onChange={() => this.setState({amount: this.state.amount})}
                value={this.state.amount} />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comments</label>
            <textarea
                id="comment"
                className="form-control"
                rows="3"
                onChange={() => this.setState({comment: this.state.comment})}
                value={this.state.comment}/>
          </div>
          <button type="button" onClick={this.handleSave.bind(this)} className="btn btn-primary">Save</button>
          <button type="button" onClick={this.handleDelete.bind(this)} className="btn btn-danger">Delete</button>
        </form>
      </div>
    );
  }
}

function stateToProps(state) {
  let { expenses } = state
  return { expenses }
}

function dispatchToProps(dispatch) {
  let actions = _.extend({}, expensesActions)
  return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(ExpenseDetails)
