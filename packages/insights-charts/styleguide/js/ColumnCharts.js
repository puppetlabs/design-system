import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  sparseness: PropTypes.number.isRequired,
};

class ColumnCharts extends React.Component {
  updateCharts() {
    const { animations, sparseness } = this.props;
    const dataPoints = 10;

    const data = {
      categories: ['1.2', '2.5', '4', '2.6', '3.8', '3.1', '4.2', '5', '1.3', '2.7'],
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
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints, { min: -10000000000, modifier: 10000, negatives: true, sparseness }),
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
      legend: {
        enabled: true,
        orientation: 'top',
        alignment: 'center',
      },
      axis: {
        y: [{
          ticks: 4,
          title: 'Left axis',
          reversed: true,
        }, {
          ticks: 4,
          orientation: 'right',
          title: 'Right axis',
        }],
        x: {
          title: 'I am a x axis title',
          labels: { rotated: true },
          paddingInner: 0.1,
          paddingOuter: 1,
        },
      },
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
    };

    this.columnChart = new ReflectChart(this.single, {
      type: 'column',
      data: singleSeriesData,
      options,
    });

    this.columnChart.render();

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

    this.stackedColumnChart.on('dataPointClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data));
    });

    this.stackedColumnChart.render();
  }

  destroyCharts() {
    this.columnChart.destroy();
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

ColumnCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
  sparseness: state.options.sparseness,
});

export default connect(mapStateToProps)(ColumnCharts);
