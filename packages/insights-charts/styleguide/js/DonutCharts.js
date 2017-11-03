import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  sparseness: PropTypes.number.isRequired,
};

class DonutCharts extends React.Component {
  updateCharts() {
    const { sparseness } = this.props;
    const dataPoints = 3;

    const data = {
      categories: ['Geoff', 'Brad', { label: 'Colby', color: 'green' }],
      series: [
        {
          label: 'Productivity',
          data: getRandomData(dataPoints, { sparseness }),
        },
      ],
    };

    this.donutChart = new ReflectChart(this.donut, {
      type: 'donut',
      data,
      options: {
        innerRadius: '50%',
        legend: {
          orientation: 'top',
          alignment: 'center',
        },
      },
    });

    this.donutChart.on('legendItemClick', (payload) => {
      console.log('you got me!!!', payload);
    });

    this.donutChart.on('dataPointClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data.point));
    });

    this.donutChart.render();

    const options = {
      legend: {
        enabled: true,
        alignment: 'right',
        aggregates: true,
      },
      layout: 'pie',
    };

    this.pieChart = new ReflectChart(this.pie, {
      type: 'donut',
      data,
      options,
    });

    this.pieChart.on('legendItemClick', (d) => {
      console.log('I was clicked!', d)
    });

    this.pieChart.render();
  }

  destroyCharts() {
    this.donutChart.destroy();
    this.pieChart.destroy();
  }

  componentDidMount() {
    this.updateCharts();
  }

  componentDidUpdate() {
    this.updateCharts();
  }

  componentWillUpdate() {
    this.destroyCharts();
  }

  componentWillUnmount() {
    this.destroyCharts();
  }

  render() {
    return (
      <div>
        <div className="sg-chart" ref={ (c) => { this.donut = c; } } />
        <div className="sg-chart" ref={ (c) => { this.pie = c; } } />
      </div>
    );
  }
}

DonutCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  sparseness: state.options.sparseness || 0,
});

export default connect(mapStateToProps)(DonutCharts);
