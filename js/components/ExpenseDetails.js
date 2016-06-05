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
	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			description: nextProps.description,
			amount: nextProps.amount,
			comment: nextProps.comment
		})
	}

	componentDidMount() {
		this.props.loadExpenseById(this.props.params.id)
	}

	_handleSave(event) {
		event.preventDefault()

		const { description, amount, comment } = this.state

		var data = {
			description: description,
			amount: amount,
			comment: comment
		}

		if(this.props.params.id)
			this.props.updateExpense(this.props.params.id, data)
		else
			this.props.addExpense(data)
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
							onChange={() => this.setState({description: description})}
							value={description} />
					</div>
					<div class='form-group'>
						<label htmlFor='amount'>Amount</label>
						<input
							className='form-control'
							id='amount'
							placeholder='0.00'
							onChange={() => this.setState({amount:amount})}
							value={amount} />
					</div>
					<div className='form-group'>
						<label htmlFor='comment'>Comments</label>
						<textarea
							id='comment'
							className='form-control'
							rows='3'
							onChange={() => this.setState({comment: comment})}
							value={comment}/>
					</div>
					<button type='button' onClick={this._handleSave.bind(this)} className='btn btn-primary'>Save</button>
					<button type='button' onClick={this._handleDelete.bind(this)} className='btn btn-danger'>Delete</button>
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
