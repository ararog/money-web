import * as React from 'react'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'

import * as expensesActions from '../actions/expenses'

class TableRow extends React.Component {

	_itemClicked() {
		const { id, history } = this.props
		history.pushState(
			null, `/dashboard/expenses/${id}`)
	}

	render() {
		const { description, amount } = this.props
		return (
			<tr onClick={this._itemClicked.bind(this)}>
				<td>{description}</td>
				<td>{amount}</td>
			</tr>
		)
	}
}

class Expenses extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this._paginate(1)
	}

	_handleSelect(event) {
		this._paginate(event)
	}

	_paginate(page) {
		this.props.fetchExpenses(page)
	}

	render() {
		const { id, history, expenses } = this.props
		let itemCount = expenses.total / 10
		var items = expenses.items.map(expense => {
			return (
				<TableRow key={expense.id} {...expense} history={history} />
			)
		})

		return (
			<div className='container'>
				<div className='page-header'>
					<h1>Expenses</h1>
				</div>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Description</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
				</table>
				<Pagination
					bsSize='medium'
					first={true}
					last={true}
					next={true}
					prev={true}
					items={itemCount}
					activePage={expenses.page}
					onSelect={this._handleSelect.bind(this)} />
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

export default connect(stateToProps, dispatchToProps)(Expenses)
