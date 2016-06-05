import * as React from 'react'
import _ from 'lodash'

import { Bar as BarChart } from 'rc-chartjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as expensesActions from '../actions/expenses'

var chartOptions = {
	animation: false,
	pointDotStrokeWidth: 4,
	scaleShowVerticalLines: false,
	responsive: true,
	maintainAspectRatio: true
}

class Overview extends React.Component {

	constructor() {
		super()
	}

	componentDidMount() {
		this.props.loadOverview()
	}

	render() {

		const { expenses } = this.props

		let lastMonthsChart
		let pendingItems
		let months = []
		let amounts = []

		if(expenses.overview.pending) {
			let key = 1
			pendingItems = expenses.overview.pending.map(pending => {
				return (
					<div key={key++} className='col-xs-6 col-md-3'>
						<h1>{pending.total.toFixed(2)}</h1>
						<p>{pending.name}</p>
					</div>
				)
			})
		}

		if(expenses.overview.lastMonths) {
			expenses.overview.lastMonths.forEach(e => {
				amounts.push(e.total.toFixed(2))
				months.push(e.name)
			})

			let chartData = {
				labels: months,
				datasets: [
					{
						label: 'My First dataset',
						fillColor: 'rgba(220,220,220,0.2)',
						strokeColor: 'rgba(220,220,220,1)',
						pointColor: 'rgba(220,220,220,1)',
						pointStrokeColor: '#fff',
						pointHighlightFill: '#fff',
						pointHighlightStroke: 'rgba(220,220,220,1)',
						data: amounts
					}
				]
			}

			lastMonthsChart = (<BarChart data={chartData} options={chartOptions} />)
		}

		return (
			<div className='container'>
				<div className='page-header'>
					<h1>Overview</h1>
				</div>
				<h3>Total of pending expenses by category</h3>
				<div className='row'>
					{pendingItems}
				</div>

				<h3>Total of expenses by category on latest 6 months</h3>
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

export default connect(stateToProps, dispatchToProps)(Overview)
