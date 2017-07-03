import React from 'react';
import { getRandomData, getRandomCategories } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class SparklineCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 10;

    const data = {
      categories: getRandomCategories(dataPoints),
      series: [
        {
          label: 'Loss',
          type: 'line',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {};

    const chart1 = new ReflectChart(this.line, {
      type: 'sparkline',
      data,
      options,
    });

    chart1.render();

    data.series[0].type = 'area';

    const chart2 = new ReflectChart(this.area, {
      type: 'sparkline',
      data,
      options,
    });

    chart2.render();

    data.series[0].type = 'column';

    const chart3 = new ReflectChart(this.column, {
      type: 'sparkline',
      data,
      options,
    });

    chart3.render();
  }

  render() {
    return (
      <div>
        <h1>Line Sparkline</h1>
        <div className="sg-chart" ref={ (c) => { this.line = c; } } />
        <h1>Area Sparkline</h1>
        <div className="sg-chart" ref={ (c) => { this.area = c; } } />
        <h1>Column Sparkline</h1>
        <div className="sg-chart" ref={ (c) => { this.column = c; } } />
      </div>
    );
  }
}

export default SparklineCharts;
