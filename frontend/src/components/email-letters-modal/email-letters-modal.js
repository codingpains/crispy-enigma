import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

class EmailLettersModal extends React.PureComponent {
  static propTypes = {
    frequencies: PropTypes.object,
  };

  static defaultProps = {
    frequencies: {},
  };

  constructor(props) {
    super(props);
    this.props.onLoadFrequencies();
  }

  get letters() {
    return Object.keys(this.props.frequencies);
  }

  get data() {
    return Object.values(this.props.frequencies);
  }

  renderChart() {
    const context = document.getElementById('bar-chart').getContext('2d');
    console.log(this.letters);
    const myBarChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: this.letters,
        datasets: [{
          label: 'Letter frequencies',
          backgroundColor: this.buildRandomColors(),
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: this.data,
        }]
      },
    });
  }

  buildRandomColors() {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
    return this.data.map(() => {
      const r = getRandomInt(255);
      const g = getRandomInt(255);
      const b = getRandomInt(255);
      return `rgba(${r}, ${g}, ${b},0.5)`;
    });
  }

  componentDidUpdate() {
    this.renderChart();
  }

  render() {
    return (
      <div className="modal fade" id={this.props.modalId} role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5>Letter frequencies accross all emails</h5>
              <canvas id="bar-chart"></canvas>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailLettersModal;
