import React from 'react';
import Chart from 'chart.js';
class EmailLettersModal extends React.PureComponent {
  renderChart() {
    const context = document.getElementById('bar-chart').getContext('2d');
    const myBarChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        datasets: [{
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: [10, 20, 30, 40, 50, 60, 70]
        }]
      },
    });
  }

  componentDidMount() {
    this.renderChart();
  }

  render() {
    return (
      <div className="modal fade" id={this.props.modalId} role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <canvas id="bar-chart"></canvas>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailLettersModal;
