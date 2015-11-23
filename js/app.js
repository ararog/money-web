import * as React from 'react';
import { render } from 'react-dom';
import { createHistory, useBasename } from 'history'
import { Router, IndexRedirect, Route, Link, History } from 'react-router';

import { container } from './container';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Overview from './components/Overview';
import Expenses from './components/Expenses';
import ExpenseDetails from './components/ExpenseDetails';

const history = useBasename(createHistory)({
  basename: '/'
})

class MoneyApp extends React.Component {

    render() {
        return (<div>{this.props.children}</div>)
    }
}

function requireAuth(nextState, replaceState) {
    if (! localStorage.getItem('token'))
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

// default behavior
function createElement(Component, props) {
    return <Component container={container} {...props}/>
}

render((
<Router history={history} createElement={createElement}>
    <Route path="/" component={MoneyApp}>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}>
            <Route path="/dashboard/overview" component={Overview} />
            <Route path="/dashboard/expenses" component={Expenses} />
            <Route path="/dashboard/expenses/new" component={ExpenseDetails} />
            <Route path="/dashboard/expenses/:id" component={ExpenseDetails} />
        </Route>
        <IndexRedirect to="dashboard" />
    </Route>
</Router>),
document.getElementById('moneyapp'));
