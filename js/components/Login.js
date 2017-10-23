import * as React from 'react'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import * as userActions from '../actions/user'

import '../../css/login.scss'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this._handleSubmit = this._handleSubmit.bind(this)
  }

	componentWillMount() {
		this.ensureNotLoggedIn(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.ensureNotLoggedIn(nextProps)
	}

	ensureNotLoggedIn(props) {
		const { user, replace, location } = props
		if (user.isLogged) {
			replace(location.query.redirect)
		}
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
        <form className='form-signin' onSubmit={this._handleSubmit}>
          <h2 className='form-signin-heading'>Please login</h2>
          <input type='text'
            className='form-control'
            placeholder='Email Address'
            onChange={(e) => this.setState({email: e.target.value})}
            required='' autofocus='' value={email} />
          <br/>
          <input type='password'
            className='form-control'
            onChange={(e) => this.setState({password: e.target.value})}
            placeholder='Password' required='' value={password} />
          <button type='submit' className='btn btn-lg btn-primary btn-block'>Login</button>
        </form>
      </div>
    )
  }
}

function stateToProps(state) {
  let { user } = state
  return { user }
}

function dispatchToProps(dispatch) {
  let actions = _.extend({}, userActions, {replace: routerActions.replace})
  return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(Login)
