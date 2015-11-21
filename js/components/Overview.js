import * as React from 'react';
import { Bar as BarChart } from 'rc-chartjs';

var chartOptions = {
    animation: false,
    pointDotStrokeWidth: 4,
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true
};

class Overview extends React.Component {

    constructor() {
        super()
        this.state = { pending: [], lastMonths: [] }
    }

    componentDidMount() {

        this.props.container.get('EXPENSES_SERVICE')
        .loadOverview()
        .then(response => {
            this.setState(
                { pending: response.data.pending, lastMonths: response.data.lastMonths })
            })
        .catch(function (response) {
            console.log(response);
        });
    }

    render() {

        var lastMonthsChart;
        var pendingItems;
        var months = []
        var amounts = []

        if(this.state.pending) {
            pendingItems = this.state.pending.map(pending => {
                return (<div className="col-xs-6 col-md-3">
                            <h1>{pending.total.toFixed(2)}</h1>
                            <p>{pending.name}</p>
                        </div>)
            });
        }

        if(this.state.lastMonths) {
            this.state.lastMonths.forEach(e => {
                amounts.push(e.total.toFixed(2))
                months.push(e.name)
            })

            var chartData = {
                labels: months,
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: amounts
                    }
                ]
            };

            lastMonthsChart = (<BarChart data={chartData} options={chartOptions} />)
        }

        return (
            <div className="container">
                <div className="page-header">
                    <h1>Overview</h1>
                </div>
                <h3>Total of pending expenses by category</h3>
                <div className="row">
                    {pendingItems}
                </div>

                <h3>Total of expenses by category on latest 6 months</h3>
                {lastMonthsChart}
            </div>
        );
    }
}

export default Overview;
