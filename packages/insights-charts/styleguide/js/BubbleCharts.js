import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomData, getRandomDates, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  sparseness: PropTypes.number.isRequired,
};

class BubbleCharts extends React.Component {
  updateCharts() {
    const { animations, sparseness } = this.props;
    const dataPoints = 10;

    const multiData = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Series 1',
          type: 'bubble',
          zLabel: 'Bubble 1',
          data: getRandomData(dataPoints, { sparseness, z: true }),
        },
        {
          label: 'Series 2',
          type: 'bubble',
          zLabel: 'Bubble 2',
          data: getRandomData(dataPoints, { sparseness, z: true }),
        },
      ],
    };

    const singleData = {
      categories: getRandomDates(dataPoints),
      series: [
        {
          label: 'Profit',
          type: 'bubble',
          zLabel: 'Bubble',
          data: getRandomData(dataPoints, { sparseness, z: true }),
        },
      ],
    };

    const options = {
      animations: {
        enabled: animations,
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
      zoom: {
        enabled: true,
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

    this.multiSeriesBubbleChart = new ReflectChart(this.multi, {
      type: 'bubble',
      data: multiData,
      options,
    });

    this.multiSeriesBubbleChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.multiSeriesBubbleChart.render();

    this.bubbleChart = new ReflectChart(this.single, {
      type: 'bubble',
      data: singleData,
      options,
    });

    this.bubbleChart.render();

    options.axis.x.orientation = 'left';
    options.axis.y[0].orientation = 'bottom';

    this.flippedBubbleChart = new ReflectChart(this.flipped, {
      type: 'bubble',
      data: singleData,
      options,
    });

    this.flippedBubbleChart.render();
  }

  destroyCharts() {
    this.bubbleChart.destroy();
    this.multiSeriesBubbleChart.destroy();
    this.flippedBubbleChart.destroy();
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

BubbleCharts.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
  sparseness: state.options.sparseness,
});

export default connect(mapStateToProps)(BubbleCharts);
