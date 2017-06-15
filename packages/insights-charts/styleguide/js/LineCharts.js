import React from 'react';
import moment from 'moment';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class LineCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const multiData = {
      categories: ['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05', '2017-01-06', '2017-01-07', '2017-01-08', '2017-01-09', '2017-01-10'],
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints),
        },
        {
          label: 'Loss',
          axis: 1,
          data: getRandomData(dataPoints),
        },
      ],
    };

    const singleData = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
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
