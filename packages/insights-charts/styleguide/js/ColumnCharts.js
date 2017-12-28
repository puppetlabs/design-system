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
      categories: [
        'Iamalongvaluewithnospaces1',
        'Iamalongvaluewithspaces2',
        'Iamalongvaluewithspaces3',
        'I am a long value with spaces 4',
        'I am a long value with spaces 5',
        'I am a long value with spaces 6',
        'I am a long value with spaces 7',
        'I am a long value with spaces 8',
        'I am a long value with spaces 9',
        'I am a long value with spaces 10',
      ],
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

    const sectors = [
      'Technology Usage > T-Mobile Cell Phone Customers > Highly Likely',
      'Technology Usage > AT&T Cell Phone Customers > Highly Likely',
      'Technology Usage > Sprint Cell Phone Customers > Highly Likely',
      'Technology Usage > Verizon Cell Phone Customers > Highly Likely',
    ];
    const dates = ['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05', '2017-01-06', '2017-01-07', '2017-01-08', '2017-01-09', '2017-01-10'];
    const teams = [
      'Philadelphia Eagles',
      'Dallas Cowboys',
      'Houston Texans',
      'Tennessee Titans',
      'Washington Redskins',
      'Jacksonville Jaguars',
      'Los Angeles Rams',
      'New York Giants',
      'Indianapolis Colts',
      'New Orleans Saints',
      'Chicago Bears',
      'Minnesota Vikings',
      'Green Bay Packers',
    ];


    const singleSeriesData = {
      categories: teams,
      series: [
        {
          label: 'Profit',
          data: getRandomData(13),
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
        opacity: 0.5,
      },
      legend: {
        enabled: true,
        orientation: 'bottom',
        alignment: 'left',
      },
      zoom: {
        enabled: true,
        type: 'x',
      },
      axis: {
        y: [{
          ticks: 4,
          title: 'Left axis',
          reversed: false,
        }, {
          ticks: 4,
          orientation: 'right',
          title: 'Right axis',
        }],
        x: {
          title: 'I am a x axis title',
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
