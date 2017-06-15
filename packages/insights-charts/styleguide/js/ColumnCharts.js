import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class ColumnCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const data = {
      categories: getRandomCategories(dataPoints, 'ordinal'),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints, -10000000000, 10000, true),
        },
        {
          label: 'Loss',
          data: getRandomData(dataPoints, -10000000000, 10000, true),
        },
      ],
    };

    const singleSeriesData = {
      categories: getRandomCategories(dataPoints, 'ordinal'),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints, -10000000000, 10000, true),
        },
      ],
    };

    const options = {
      axis: {
        y: [{
          ticks: 4,
          title: 'Left axis',
        }, {
          ticks: 4,
          orientation: 'right',
          title: 'Right axis',
        }],
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

    const chart1 = new ReflectChart(this.single, {
      type: 'column',
      data: singleSeriesData,
      options,
    });

    chart1.render();

    options.layout = 'grouped';

    const chart2 = new ReflectChart(this.grouped, {
      type: 'column',
      data,
      options,
    });

    chart2.render();

    options.layout = 'stacked';

    const chart3 = new ReflectChart(this.stacked, {
      type: 'column',
      data,
      options,
    });

    chart3.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    chart3.render();
  }

  render() {
    return (
      <div>
        <h1>Single series</h1>
        <div className="sg-chart" ref={ (c) => { this.single = c; } } />
        <h1>Grouped</h1>
        <div className="sg-chart" ref={ (c) => { this.grouped = c; } } />
        <h1>Stacked</h1>
        <div className="sg-chart" ref={ (c) => { this.stacked = c; } } />
      </div>
    );
  }
}

export default ColumnCharts;
