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
      area: {
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

  componentWillUnmount() {
    this.areaChart.destroy();
    this.nonStackedAreaChart.destroy();
  }

  render() {
    return (
      <div>
        <h1>Multiseries Stacked Area</h1>
        <div className="sg-chart" ref={ (c) => { this.stacked = c; } } />
        <h1>Multiseries Non-Stacked Area</h1>
        <div className="sg-chart" ref={ (c) => { this.nonStacked = c; } } />
      </div>
    );
  }
}

export default AreaCharts;
