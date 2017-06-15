import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class AreaCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const data = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Loss',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
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
    };

    const area = new ReflectChart(this.basic, {
      type: 'area',
      data,
      options,
    });

    area.render();

    options.layout = 'stacked';

    const stackedArea = new ReflectChart(this.stacked, {
      type: 'area',
      data,
      options,
    });

    stackedArea.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    stackedArea.render();
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
