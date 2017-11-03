import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  sparseness: PropTypes.number.isRequired,
};

class ScatterCharts extends React.Component {
  updateCharts() {
    const { sparseness } = this.props;
    const dataPoints = 10;

    const multiData = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Series 1',
          data: getRandomData(dataPoints, { sparseness }),
        },
        {
          label: 'Series 2',
          data: getRandomData(dataPoints, { sparseness }),
        },
      ],
    };

    const singleData = {
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
        enabled: false,
      },
      axis: {
        x: {},
        y: [
          {
            ticks: 4,
            title: 'Profit',
          },
          {
            ticks: 4,
            orientation: 'right',
            title: 'Loss',
          },
        ],
      },
      tooltips: {
        type: 'simple',
      },
      data_labels: {
        enabled: true,
      },
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
    };

    this.multiSeriesScatterChart = new ReflectChart(this.multi, {
      type: 'scatter',
      data: multiData,
      options,
    });

    this.multiSeriesScatterChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.multiSeriesScatterChart.render();

    this.scatterChart = new ReflectChart(this.single, {
      type: 'scatter',
      data: singleData,
      options,
    });

    this.scatterChart.render();

    options.axis.x.orientation = 'left';
    options.axis.y[0].orientation = 'bottom';

    this.flippedScatterChart = new ReflectChart(this.flipped, {
      type: 'scatter',
      data: singleData,
      options,
    });

    this.flippedScatterChart.render();
  }

  destroyCharts() {
    this.scatterChart.destroy();
    this.multiSeriesScatterChart.destroy();
    this.flippedScatterChart.destroy();
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
        <h1>Multi series</h1>
        <div className="sg-chart" ref={ (c) => { this.multi = c; } } />
        <h1>Single series</h1>
        <div className="sg-chart" ref={ (c) => { this.single = c; } } />
        <h1>Flipped Axis - Single series</h1>
        <div className="sg-chart" ref={ (c) => { this.flipped = c; } } />
      </div>
    );
  }
}

ScatterCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  sparseness: state.options.sparseness || 0,
});

export default connect(mapStateToProps)(ScatterCharts);
