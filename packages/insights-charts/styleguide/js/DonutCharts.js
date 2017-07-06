import React from 'react';
import { getRandomData } from './helpers';
import ReflectChart from '../../source/js/ReflectCharts';

class DonutCharts extends React.Component {
  componentDidMount() {
    const dataPoints = 3;

    const data = {
      categories: ['Geoff', 'Brad', { label: 'Colby', color: 'green' }],
      series: [
        {
          label: 'Productivity',
          data: getRandomData(dataPoints),
        },
      ],
    };

    const options = {
    };

    this.donutChart = new ReflectChart(this.elem, {
      type: 'donut',
      data,
      options,
    });

    this.donutChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.donutChart.render();
  }

  componentWillUnmount() {
    this.donutChart.destroy();
  }

  render() {
    return (
      <div className="sg-chart" ref={ (c) => { this.elem = c; } } />
    );
  }
}

export default DonutCharts;
