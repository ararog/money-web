import * as React from 'react';

class ExpenseDetails extends React.Component {

  componentDidMount() {

    this.props.container.get('EXPENSES_SERVICE')
    .loadById(this.props.params.id)
    .then(response => {
      this.refs.description.value = response.data.description
      this.refs.amount.value = response.data.amount
      this.refs.comment.value = response.data.comment
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  handleSave(event) {
    event.preventDefault()

    var data = {
        description: this.refs.description.value,
        amount: this.refs.amount.value,
        comment: this.refs.comment.value
    }

    var p;
    if(this.props.params.id)
        p = this.props.container.get('EXPENSES_SERVICE')
        .update(this.props.params.id, data)
    else
        p = this.props.container.get('EXPENSES_SERVICE')
        .add(data)

    p.then(response => {
        this.props.history.goBack()
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  handleDelete(event) {
    event.preventDefault()

    this.props.container.get('EXPENSES_SERVICE')
    .delete(this.props.params.id)
    .then(response => {
        this.props.history.goBack()
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  render() {

    return (
      <div className="container">
        <div className="page-header">
          <h1>Expense Details</h1>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input ref="description" className="form-control" id="description" placeholder="Description" />
          </div>
          <div class="form-group">
            <label htmlFor="amount">Amount</label>
            <input ref="amount" className="form-control" id="amount" placeholder="0.00" />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comments</label>
            <textarea ref="comment" id="comment" className="form-control" rows="3"></textarea>
          </div>
          <button type="button" onClick={this.handleSave.bind(this)} className="btn btn-primary">Save</button>
          <button type="button" onClick={this.handleDelete.bind(this)} className="btn btn-danger">Delete</button>
        </form>
      </div>
    );
  }
}

export default ExpenseDetails;
