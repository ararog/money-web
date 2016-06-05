import * as React from 'react'
import { Link } from 'react-router'

class MenuItem extends React.Component {

	handleClick() {
		const {
			onClick,
			page
		} = this.props
		onClick(page)
	}

	render() {

		const {
			active,
			page,
			label
		} = this.props

		return (
			<li className={active ? 'active' : ''}><Link to={`/dashboard/${page}`} onClick={this.handleClick.bind(this)}>{label}</Link></li>
		)
	}
}

export default MenuItem
