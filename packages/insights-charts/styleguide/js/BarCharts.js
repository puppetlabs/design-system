import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  sparseness: PropTypes.number.isRequired,
};

class BarCharts extends React.Component {
  updateCharts() {
    const { animations, sparseness } = this.props;
    const dataPoints = 10;

    const data = {
      categories: getRandomCategories(dataPoints, 'ordinal'),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints, { min: -10000000000, modifier: 10000, negatives: true, sparseness }),
        },
        {
          label: 'Loss',
          data: getRandomData(dataPoints, { min: -10000000000, modifier: 10000, negatives: true, sparseness }),
        },
      ],
    };

    const singleSeriesData = {
      categories: getRandomCategories(dataPoints, 'ordinal'),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints, { sparseness }),
        },
      ],
    };

    const options = {
      animations: {
        enabled: animations,
      },
      column: {
        data_labels: {
          enabled: true,
        },
      },
      axis: {
        y: [{
          // min: -5000,
          // max: 5000,
          ticks: 4,
          title: 'Left axis',
          orientation: 'bottom',
        }],
        x: {
          title: 'I am a x axis title',
          orientation: 'left',
        },
      },
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
    };

    this.barChart = new ReflectChart(this.single, {
      type: 'column',
      data: singleSeriesData,
      options,
    });

    this.barChart.render();

    options.column.layout = 'grouped';

    this.groupedColumnChart = new ReflectChart(this.grouped, {
      type: 'column',
      data,
      options,
    });

    this.groupedColumnChart.render();

    options.column.layout = 'stacked';

    this.stackedColumnChart = new ReflectChart(this.stacked, {
      type: 'column',
      data,
      options,
    });

    this.stackedColumnChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.stackedColumnChart.render();
  }

  destroyCharts() {
    this.barChart.destroy();
    this.groupedColumnChart.destroy();
    this.stackedColumnChart.destroy();
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
        <h1>Single series</h1>
        <div className="sg-chart" ref={ (c) => { this.single = c; } } />
        <h1>Grouped</h1>
        <div className="sg-chart" ref={ (c) => { this.grouped = c; } } />
        <h1>Stacked</h1>
        <div className="sg-chart" ref={ (c) => { this.stacked = c; } } />
      </div>
    );
  }
}

BarCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
  sparseness: state.options.sparseness,
});

export default connect(mapStateToProps)(BarCharts);
