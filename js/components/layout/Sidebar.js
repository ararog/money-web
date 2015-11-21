import * as React from 'react';
import MenuItem from './MenuItem';

class Sidebar extends React.Component {

  constructor() {
    super()
    this.state = {current: 'overview'}
  }

  handleClick(page) {
    this.setState({current: page})
  }

  render() {

    var boundClick = this.handleClick.bind(this);

    return (
      <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
              <MenuItem active={this.state.current == 'overview'} onClick={boundClick} page="overview" label="Overview" />
              <MenuItem active={this.state.current == 'expenses'} onClick={boundClick} page="expenses" label="Expenses" />
          </ul>
      </div>
    );
  }
}

export default Sidebar;
