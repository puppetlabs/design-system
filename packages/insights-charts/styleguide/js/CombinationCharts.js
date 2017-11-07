import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  sparseness: PropTypes.number.isRequired,
};

class CombinationCharts extends React.Component {
  updateCharts() {
    const { animations, sparseness } = this.props;
    const dataPoints = 10;

    const data = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          type: 'column',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Loss',
          type: 'column',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Really long series name (Margin)',
          aggregate: 50000,
          type: 'line',
          axis: 1,
          data: getRandomData(dataPoints, { sparseness }),
        },
      ],
    };

    const options = {
      animations: {
        enabled: animations,
      },
      column: {
        layout: 'grouped',
        data_labels: {
          enabled: true,
        },
      },
      line: {
        spline: true,
        data_labels: {
          enabled: true,
        },
      },
      axis: {
        y: [
          {
            ticks: 4,
            orientation: 'left',
            title: 'Left Axis',
            formatter: 'numeric_percentage',
          },
          {
            ticks: 4,
            orientation: 'right',
            title: 'Right Axis',
          },
        ],
        x: {
          title: 'I am a x axis title',
        },
      },
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
      annotations: [{
        highestPoint: true,
      }],
    };

    this.combinationChart = new ReflectChart(this.basic, {
      type: 'combination',
      data,
      options,
    });

    this.combinationChart.render();
  }

  destroyCharts() {
    this.combinationChart.destroy();
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
        <h1>Combination (Column, Line & Scatter)</h1>
        <div className="sg-chart" ref={ (c) => { this.basic = c; } } />
      </div>
    );
  }
}

CombinationCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
  sparseness: state.options.sparseness,
});

export default connect(mapStateToProps)(CombinationCharts);
