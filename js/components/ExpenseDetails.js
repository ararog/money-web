import * as React from 'react'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as expensesActions from '../actions/expenses'

class ExpenseDetails extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			description: '',
			amount: 0,
			comment: ''
		}

		this._handleSave = this._handleSave.bind(this)
		this._handleDelete = this._handleDelete.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		const { expenses } = nextProps
		this.setState({
			description: expenses.expense.description,
			amount: expenses.expense.amount,
			comment: expenses.expense.comment
		})
	}

	componentDidMount() {
		this.props.loadExpenseById(this.props.params.id)
	}

	_handleSave(event) {
		event.preventDefault()
		const { updateExpense, addExpense, params } = this.props
		const { description, amount, comment } = this.state

		var data = {
			description: description,
			amount: amount,
			comment: comment
		}

		if(params.id)
			updateExpense(params.id, data)
		else
			addExpense(data)
	}

	_handleDelete(event) {
		event.preventDefault()
		this.props.deleteExpense(this.props.params.id)
	}

	render() {
		const { description, amount, comment } = this.state

		return (
			<div className='container'>
				<div className='page-header'>
					<h1>Expense Details</h1>
				</div>
				<form>
					<div className='form-group'>
						<label htmlFor='description'>Description</label>
						<input
							className='form-control'
							id='description'
							placeholder='Description'
							onChange={(e) => this.setState({description: e.target.value})}
							value={description} />
					</div>
					<div class='form-group'>
						<label htmlFor='amount'>Amount</label>
						<input
							className='form-control'
							id='amount'
							placeholder='0.00'
							onChange={(e) => this.setState({amount: e.target.value})}
							value={amount} />
					</div>
					<div className='form-group'>
						<label htmlFor='comment'>Comments</label>
						<textarea
							id='comment'
							className='form-control'
							rows='3'
							onChange={(e) => this.setState({comment: e.target.value})}
							value={comment}/>
					</div>
					<button type='button' onClick={this._handleSave} className='btn btn-primary'>Save</button>
					<button type='button' onClick={this._handleDelete} className='btn btn-danger'>Delete</button>
				</form>
			</div>
		)
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
