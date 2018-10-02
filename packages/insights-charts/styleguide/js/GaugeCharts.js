import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  sparseness: PropTypes.number.isRequired,
};

class GaugeCharts extends React.Component {
  updateCharts() {
    const { animations, sparseness } = this.props;
    const dataPoints = 3;

    const data = {
      categories: ['Velocity'],
      series: [
        {
          label: 'Velocity',
          data: [10],
        },
      ],
    };

    this.gaugeChart = new ReflectChart(this.gauge, {
      type: 'gauge',
      data,
      options: {
        gauge: {
          minValue: 0,
          maxValue: 100,
          delta: {
            direction: 'up',
            value: '+10 pts',
          },
        },
        animations: {
          enabled: animations,
        },
        legend: {
          orientation: 'top',
          alignment: 'center',
        },
      },
    });

    this.gaugeChart.on('legendItemClick', (payload) => {
      console.log('you got me!!!', payload);
    });

    this.gaugeChart.on('dataPointClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data.point));
    });

    this.gaugeChart.render();
  }

  destroyCharts() {
    this.gaugeChart.destroy();
  }

  componentDidMount() {
    this.updateCharts();
  }

  componentWillUpdate() {
    this.destroyCharts();
  }

  componentDidUpdate() {
    this.updateCharts();
  }

  componentWillUnmount() {
    this.destroyCharts();
  }

  render() {
    return (
      <div>
        <div className="sg-chart" ref={ (c) => { this.gauge = c; } } />
      </div>
    );
  }
}

GaugeCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
  sparseness: state.options.sparseness,
});

export default connect(mapStateToProps)(GaugeCharts);
