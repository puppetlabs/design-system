import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class CombinationCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const data = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          type: 'column',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Loss',
          type: 'column',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Margin',
          type: 'line',
          axis: 1,
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
      column: {
        layout: 'grouped',
      },
      line: {
        spline: true,
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
        tooltip: {
          title: 'this is a title',
          message: 'this is a message',
        },
      }],
    };

    this.combinationChart = new ReflectChart(this.basic, {
      type: 'combination',
      data,
      options,
    });

    this.combinationChart.render();
  }

  componentWillUnmount() {
    this.combinationChart.destroy();
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

export default CombinationCharts;
