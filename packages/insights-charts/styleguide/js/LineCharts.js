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
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints, -10000000000, 10000, true),
        },
      ],
    };

    const options = {
      line: {
        spline: true,
        data_labels: {
          enabled: true,
        },
      },
      axis: {
        y: {
          min: -8000,
          max: 8000,
          ticks: 4,
          title: 'Profit',
        },
      },
      tooltips: {
        type: 'simple',
        class: 'i-am-a-custom-class',
      },
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
      legend: {
        enabled: true,
        orientation: 'bottom',
      },
    };

    this.multiSeriesLineChart = new ReflectChart(this.multi, {
      type: 'line',
      data: multiData,
      options,
    });

    this.multiSeriesLineChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.multiSeriesLineChart.render();

    this.lineChart = new ReflectChart(this.single, {
      type: 'line',
      data: singleData,
      options,
    });

    this.lineChart.on('dataPointClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data));
    });

    this.lineChart.on('annotationClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data));
    });

    this.lineChart.render();
  }

  componentWillUnmount() {
    this.lineChart.destroy();
    this.multiSeriesLineChart.destroy();
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
