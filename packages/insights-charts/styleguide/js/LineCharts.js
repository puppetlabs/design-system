import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  sparseness: PropTypes.number.isRequired,
};

class LineCharts extends React.Component {
  updateCharts() {
    const { animations, sparseness } = this.props;
    const dataPoints = 10;

    const multiData = {
      categories: ['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05', '2017-01-06', '2017-01-07', '2017-01-08', '2017-01-09', '2017-01-10'],
      series: [
        {
          label: 'Profit 1',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 2',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 3',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 4',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 5',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 6',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 7',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 8',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 9',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 10',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 11',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 12',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 13',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 14',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 15',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 16',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 17',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 18',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 19',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 20',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 21',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Profit 22',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Loss',
          data: getRandomData(dataPoints, { sparseness }),
        },
      ],
    };

    const singleData = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints, { min: -10000000000, modifier: 10000, negatives: true, sparseness }),
        },
      ],
    };

    const timeData = {
      categories: ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04'],
      series: [
        {
          label: 'Profit',
          data: [0.2, 0.5, 0.134, 0.45, ],
        },
      ],
    };

    const denseData = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          data: [0.2, 0.5, 0.134, 0.45, 0.87, 0.55, 0.23, 0.1, 0.9, -2],
        },
      ],
    };

    const options = {
      animations: {
        enabled: animations,
      },
      line: {
        spline: true,
        data_labels: {
          enabled: true,
        },
      },
      axis: {
        x: {},
        y: {
          // min: -8000,
          // max: 8000,
          title: 'Profit',
          orientation: 'left',
        },
      },
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
      legend: {
        enabled: true,
        orientation: 'bottom',
      },
    };

    this.multiSeriesLineChart = new ReflectChart(this.multi, {
      type: 'line',
      data: multiData,
      options,
    });

    this.multiSeriesLineChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.multiSeriesLineChart.render();

    this.lineChart = new ReflectChart(this.single, {
      type: 'line',
      data: timeData,
      options,
    });

    this.lineChart.on('dataPointClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data));
    });

    this.lineChart.on('annotationClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data));
    });

    this.lineChart.render();
  }

  destroyCharts() {
    this.lineChart.destroy();
    this.multiSeriesLineChart.destroy();
  }

  componentDidUpdate() {
    this.updateCharts();
  }

  componentDidMount() {
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
        <h1>Multi series</h1>
        <div className="sg-chart" ref={ (c) => { this.multi = c; } } />
      </div>
    );
  }
}

LineCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
  sparseness: state.options.sparseness,
});

export default connect(mapStateToProps)(LineCharts);
