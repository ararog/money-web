import * as React from 'react';
import Navbar  from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import Overview from './Overview';

require('../../css/dashboard.scss')

class Dashboard extends React.Component {

  render() {

    return (
      <div>
        <Navbar />
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                  {this.props.children || <Overview container={this.props.container} />}
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
