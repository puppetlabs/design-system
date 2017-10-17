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

    this.donutChart = new ReflectChart(this.donut, {
      type: 'donut',
      data,
      options: {
        innerRadius: '50%',
      },
    });

    this.donutChart.on('legendItemClick', () => {
      console.log('you got me!!!');
    });

    this.donutChart.on('dataPointClick', ({ event, data }) => {
      console.log(JSON.stringify(event));
      console.log(JSON.stringify(data.point));
    });

    this.donutChart.render();

    const options = {
      legend: { enabled: true, aggregates: true },
      layout: 'pie',
    };

    this.pieChart = new ReflectChart(this.pie, {
      type: 'donut',
      data,
      options,
    });

    this.pieChart.on('legendItemClick', (d) => {
      console.log('I was clicked!', d)
    });

    this.pieChart.render();
  }

  componentWillUnmount() {
    this.donutChart.destroy();
  }

  render() {
    return (
      <div>
        <div className="sg-chart" ref={ (c) => { this.donut = c; } } />
        <div className="sg-chart" ref={ (c) => { this.pie = c; } } />
      </div>
    );
  }
}

export default DonutCharts;
