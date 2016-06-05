import * as React from 'react';
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as usersActions from '../actions/users'

import * from '../../css/login.scss'

class Login extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          email: '',
          password: ''
      }
  }

  componentWillReceiveProps(nextProps) {

      if(nextProps.isLogged)
        this.props.history.replaceState(null, '/dashboard/overview')
  }

  _handleSubmit(event) {
    event.preventDefault()

    const {email, password} = this.state

    this.props.login(email, password)
  }

  render() {
    const {email, password} = this.state

    return (
        <div className='wrapper'>
          <form className='form-signin' onSubmit={this._handleSubmit.bind(this)}>
            <h2 className='form-signin-heading'>Please login</h2>
            <input type='text'
                className='form-control'
                placeholder='Email Address'
                onChange={() => this.setState({email: email})}
                required='' autofocus='' value={email} />
            <br/>
            <input type='password'
                className='form-control'
                onChange={() => this.setState({password: password})}
                placeholder='Password' required='' value={password} />
            <button type='submit' className='btn btn-lg btn-primary btn-block'>Login</button>
          </form>
        </div>
    )
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
