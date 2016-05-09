import * as React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as usersActions from '../actions/users';

require('../../css/login.scss')

class Login extends React.Component {

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const password = this.refs.password.value

    this.props.login(email, password)
    //this.props.history.replaceState(null, '/dashboard/overview')
  }

  render() {
    return (
        <div className="wrapper">
          <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
            <h2 className="form-signin-heading">Please login</h2>
            <input type="text" ref="email" className="form-control" placeholder="Email Address" required="" autofocus="" />
            <br/>
            <input type="password" ref="password" className="form-control" placeholder="Password" required=""/>
            <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
          </form>
        </div>
    );
  }
}

function stateToProps(state) {
  let { users } = state
  return { users }
}

function dispatchToProps(dispatch) {
  let actions = _.extend({}, usersActions)
  return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(Login)
