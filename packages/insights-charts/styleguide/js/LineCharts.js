import React from 'react';
import ReflectCharts from '../../source/js/ReflectCharts';

class LineCharts extends React.Component {
  componentDidMount() {
    const data = {
      categories: [1, 2, 3, 4, 5],
      series: [
        {
          label: 'Series 1',
          data: [10, 20, 30, 40, 50],
        },
      ],
    };

    const chart = new ReflectCharts('line', this.elem, data);
  }

  render() {
    return (
      <div ref={ (c) => { this.elem = c; } } />
    );
  }
}

export default LineCharts;
