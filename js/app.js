import * as React from 'react'

import { bindActionCreators, combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { connect, Provider } from 'react-redux'
import { render } from 'react-dom'
import { Router, IndexRedirect, Route, Link, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { persistStore, autoRehydrate } from 'redux-persist'
import localForage from 'localforage'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import * as reducers from './reducers'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Overview from './components/Overview'
import Expenses from './components/Expenses'
import ExpenseDetails from './components/ExpenseDetails'

class MoneyApp extends React.Component {

	render() {
		return (<div>{this.props.children}</div>)
	}
}

const baseHistory = browserHistory
const routing = routerMiddleware(baseHistory)
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}))

const logger = createLogger()
const store = createStore(reducer, {}, compose(
	autoRehydrate(),
	applyMiddleware(thunk, logger, routing)
))

const history = syncHistoryWithStore(baseHistory, store)
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
	redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
	predicate: user => user.isLogged
})

const router = (
	<Router history={history}>
		<Route path="/" component={MoneyApp}>
			<Route path="/login" component={Login} />
			<Route path="/dashboard" component={UserIsAuthenticated(Dashboard)}>
				<Route path="/dashboard/overview" component={Overview} />
				<Route path="/dashboard/expenses" component={Expenses} />
				<Route path="/dashboard/expenses/new" component={ExpenseDetails} />
				<Route path="/dashboard/expenses/:id" component={ExpenseDetails} />
			</Route>
			<IndexRedirect to="dashboard" />
		</Route>
	</Router>
)

persistStore(store, {storage: localForage, blacklist: ['routing']}, () => {
	render((
		<Provider store={store}>
			{router}
		</Provider>
	),
	document.getElementById('moneyapp'))
})
