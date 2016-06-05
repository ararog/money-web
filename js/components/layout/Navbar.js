import * as React from 'react'
import { Link } from 'react-router'

class Navbar extends React.Component {


	render() {

		return (
			<nav className='navbar navbar-inverse navbar-fixed-top'>
				<div className='container-fluid'>
					<div className='navbar-header'>
						<button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
							<span className='sr-only'>Toggle navigation</span>
							<span className='icon-bar'></span>
							<span className='icon-bar'></span>
							<span className='icon-bar'></span>
						</button>
						<a className='navbar-brand' href='#'>Money</a>
					</div>
					<div id='navbar' className='navbar-collapse collapse'>
						<ul className='nav navbar-nav navbar-right'>
							<li><Link to='/dashboard/overview'>Dashboard</Link></li>
							<li><Link to='/dashboard/expenses'>Expenses</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

export default Navbar
