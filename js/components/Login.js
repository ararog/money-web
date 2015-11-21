import * as React from 'react';

require('../../css/login.scss')

class Login extends React.Component {

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const password = this.refs.password.value

    this.props.container.get('USERS_SERVICE').login(email, password)
    .then(response => {
      localStorage.setItem('token', response.data.auth_token);
      this.props.history.replaceState(null, '/dashboard/overview')
    })
    .catch(function (response) {
      console.log(response);
    });
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

export default Login;
