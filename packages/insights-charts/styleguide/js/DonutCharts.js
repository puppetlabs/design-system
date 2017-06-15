import React from 'react';
import { getRandomData } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class DonutCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 3;

    const data = {
      categories: ['Geoff', 'Brad', 'Colby'],
      series: [
        {
          label: 'Productivity',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
    };

    const chart = new ReflectChart(this.elem, {
      type: 'donut',
      data,
      options,
    });

    chart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    chart.render();
  }

  render() {
    return (
      <div className="sg-chart" ref={ (c) => { this.elem = c; } } />
    );
  }
}

export default DonutCharts;
