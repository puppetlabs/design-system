import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class ScatterCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const multiData = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Series 1',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Series 2',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const singleData = {
      categories: getRandomCategories(dataPoints, 'ordinal'),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
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

  componentWillUnmount() {
    this.scatterChart.destroy();
    this.multiSeriesScatterChart.destroy();
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

export default ScatterCharts;
