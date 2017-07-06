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

    this.lineSparkline = new ReflectChart(this.line, {
      type: 'sparkline',
      data,
      options,
    });

    this.lineSparkline.render();

    data.series[0].type = 'area';

    this.areaSparkline = new ReflectChart(this.area, {
      type: 'sparkline',
      data,
      options,
    });

    this.areaSparkline.render();

    data.series[0].type = 'column';

    this.columnSparkline = new ReflectChart(this.column, {
      type: 'sparkline',
      data,
      options,
    });

    this.columnSparkline.render();
  }

  componentWillUnmount() {
    this.lineSparkline.destroy();
    this.areaSparkline.destroy();
    this.columnSparkline.destroy();
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
