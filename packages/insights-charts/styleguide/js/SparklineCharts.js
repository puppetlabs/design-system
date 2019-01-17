import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  sparseness: PropTypes.number.isRequired,
};

class SparklineCharts extends React.Component {
  updateCharts() {
    const dataPoints = 10;
    const { animations, sparseness } = this.props;

    // by default the series should be a line
    const data = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Loss',
          data: getRandomData(dataPoints, { sparseness }),
        },
      ],
    };

    const options = {
      palette: 'negative',
      animations: {
        enabled: animations,
      },
    };

    this.lineSparkline = new ReflectChart(this.line, {
      type: 'sparkline',
      data,
      options,
    });

    this.lineSparkline.render();

    data.series[0].type = 'area';

    this.areaSparkline = new ReflectChart(this.area, {
      type: 'sparkline',
      data,
      options,
    });

    this.areaSparkline.render();

    data.series[0].type = 'column';

    this.columnSparkline = new ReflectChart(this.column, {
      type: 'sparkline',
      data,
      options,
    });

    this.columnSparkline.render();
  }

  destroyCharts() {
    this.lineSparkline.destroy();
    this.areaSparkline.destroy();
    this.columnSparkline.destroy();
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
        <h1>Line Sparkline</h1>
        <div className="sg-chart" ref={ (c) => { this.line = c; } } />
        <h1>Area Sparkline</h1>
        <div className="sg-chart" ref={ (c) => { this.area = c; } } />
        <h1>Column Sparkline</h1>
        <div className="sg-chart" ref={ (c) => { this.column = c; } } />
      </div>
    );
  }
}

SparklineCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
  sparseness: state.options.sparseness,
});

export default connect(mapStateToProps)(SparklineCharts);
