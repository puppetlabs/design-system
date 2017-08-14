import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class ColumnCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const data = {
      categories: ['Geoff super long name', 'Jessica super long name', 'Abigail super long name', 'Jacob super long name', 'Kayla super long name', 'Alex super long name', 'Brad super long name', 'Colby super long name', 'Farrah super long name', 'Sebastian super long name'],
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
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Profit',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
      column: {
        data_labels: {
          enabled: true,
        },
      },
      legend: {
        enabled: true,
        orientation: 'bottom',
      },
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
          labels: {
            rotated: true,
          },
        },
      },
      grid: {
        enabled: true,
        horizontal: true,
        vertical: true,
      },
    };

    this.columnChart = new ReflectChart(this.single, {
      type: 'column',
      data: singleSeriesData,
      options,
    });

    this.columnChart.render();

    options.column.layout = 'grouped';

    this.groupedColumnChart = new ReflectChart(this.grouped, {
      type: 'column',
      data,
      options,
    });

    this.groupedColumnChart.render();

    options.column.layout = 'stacked';

    this.stackedColumnChart = new ReflectChart(this.stacked, {
      type: 'column',
      data,
      options,
    });

    this.stackedColumnChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.stackedColumnChart.on('dataPointClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data));
    });

    this.stackedColumnChart.render();
  }

  componentWillUnmount() {
    this.columnChart.destroy();
    this.groupedColumnChart.destroy();
    this.stackedColumnChart.destroy();
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
