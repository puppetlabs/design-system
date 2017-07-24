import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class AreaCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;
    const dataArr = getRandomData(dataPoints);

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
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
      area: {},
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
        enabled: false,
        horizontal: false,
        vertical: false,
      },
      annotations: [{
        highestPoint: true,
        tooltip: {
          title: 'this is a title',
          message: 'this is a message',
        },
      }],
    };

    this.areaChart = new ReflectChart(this.basic, {
      type: 'area',
      data,
      options,
    });

    this.areaChart.render();

    options.area.layout = 'stacked';

    this.stackedAreaChart = new ReflectChart(this.stacked, {
      type: 'area',
      data,
      options,
    });

    this.stackedAreaChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.stackedAreaChart.on('dataPointClick', (data) => {
      console.log(data);
    });

    this.stackedAreaChart.render();
  }

  componentWillUnmount() {
    this.areaChart.destroy();
    this.stackedAreaChart.destroy();
  }

  render() {
    return (
      <div>
        <h1>Basic Area</h1>
        <div className="sg-chart" ref={ (c) => { this.basic = c; } } />
        <h1>Stacked Area</h1>
        <div className="sg-chart" ref={ (c) => { this.stacked = c; } } />
      </div>
    );
  }
}

export default AreaCharts;
