import * as React from 'react';
import { Pagination } from 'react-bootstrap';

class TableRow extends React.Component {

  itemClicked(event) {

    this.props.history.pushState(
      null, '/dashboard/expenses/' + this.props.id)
  }

  render() {

    return (
      <tr onClick={this.itemClicked.bind(this)}>
        <td>{this.props.description}</td>
        <td>{this.props.amount}</td>
      </tr>
    )
  }
}

class Expenses extends React.Component {

  constructor() {
    super()
    this.state = {activePage: 1, itemCount: 0, items: []}
  }

  componentDidMount() {
    this.paginate(1)
  }

  handleSelect(event, selectedEvent) {
    this.paginate(selectedEvent.eventKey)
  }

  paginate(page) {
    this.props.container.get('EXPENSES_SERVICE')
    .loadExpenses(page)
    .then(response => {
      this.setState({activePage: page, itemCount: response.data.total / 10, items: response.data.items })
    })
    .catch(function (response) {
      console.log(response)
    });
  }

  render() {
    var items = this.state.items.map(expense => {
          return (
            <TableRow key={this.props.id} {...expense} history={this.props.history} />
          );
        });

    return (
        <div className="container">
          <div className="page-header">
            <h1>Expenses</h1>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
          <Pagination
            bsSize="medium"
            first={true}
            last={true}
            next={true}
            prev={true}
            items={this.state.itemCount}
            activePage={this.state.activePage}
            onSelect={this.handleSelect.bind(this)} />
        </div>
    );
  }
}

export default Expenses;
