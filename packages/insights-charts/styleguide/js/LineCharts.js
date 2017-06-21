import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class LineCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const multiData = {
      categories: ['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05', '2017-01-06', '2017-01-07', '2017-01-08', '2017-01-09', '2017-01-10'],
      series: [
        {
          label: 'Profit 1',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 2',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 3',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 4',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 5',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 6',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 7',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 8',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 9',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 10',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 11',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 12',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 13',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 14',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 15',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 16',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 17',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 18',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 19',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 20',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 21',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Profit 22',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Loss',
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
      line: {
        spline: true,
      },
      axis: {
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
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
    };

    const multi = new ReflectChart(this.multi, {
      type: 'line',
      data: multiData,
      options,
    });

    multi.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    multi.render();

    const single = new ReflectChart(this.single, {
      type: 'line',
      data: singleData,
      options,
    });

    single.render();

  }

  render() {
    return (
      <div>
        <h1>Multi series</h1>
        <div className="sg-chart" ref={ (c) => { this.multi = c; } } />
        <h1>Single series</h1>
        <div className="sg-chart" ref={ (c) => { this.single = c; } } />
      </div>
    );
  }
}

export default LineCharts;
