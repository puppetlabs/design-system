import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  sparseness: PropTypes.number.isRequired,
};

class AreaCharts extends React.Component {
  updateCharts() {
    const { animations, sparseness } = this.props;
    const dataPoints = 10;
    const dataArr = getRandomData(dataPoints, { sparseness });

    const data = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          aggregate: dataArr.reduce((a, b) => (a + b)),
          data: dataArr,
        },
        {
          label: 'Loss',
          data: getRandomData(dataPoints, { sparseness }),
        },
      ],
    };

    const options = {
      animations: {
        enabled: animations,
      },
      area: {
        line: {
          enabled: false,
        },
        pointsOfInterest: {
          onHover: true,
        },
        data_labels: {
          enabled: true,
        },
      },
      zoom: {
        enabled: true,
      },
      axis: {
        y: [
          {
            max: 110,
            ticks: 4,
            orientation: 'left',
            title: 'Left Axis',
            formatter: 'numeric_percentage',
          },
        ],
        x: {
          title: 'I am a x axis title',
        },
      },
      grid: {
        enabled: false,
        horizontal: false,
        vertical: false,
      },
    };

    this.areaChart = new ReflectChart(this.stacked, {
      type: 'area',
      data,
      options,
    });

    this.areaChart.render();

    options.area.layout = 'normal';

    this.nonStackedAreaChart = new ReflectChart(this.nonStacked, {
      type: 'area',
      data,
      options,
    });

    this.nonStackedAreaChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.nonStackedAreaChart.on('dataPointClick', (data) => {
      console.log(data);
    });

    this.nonStackedAreaChart.render();
  }

  destroyCharts() {
    this.areaChart.destroy();
    this.nonStackedAreaChart.destroy();
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
        <h1>Multiseries stacked</h1>
        <div className="sg-chart" ref={ (c) => { this.stacked = c; } } />
        <h1>Multiseries non-stacked</h1>
        <div className="sg-chart" ref={ (c) => { this.nonStacked = c; } } />
      </div>
    );
  }
}

AreaCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
  sparseness: state.options.sparseness,
});

export default connect(mapStateToProps)(AreaCharts);
