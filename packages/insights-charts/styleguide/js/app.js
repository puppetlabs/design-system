import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './store/reducers';
import Styleguide from './Styleguide';
import LineCharts from './LineCharts';
import ColumnCharts from './ColumnCharts';
import BarCharts from './BarCharts';
import AreaCharts from './AreaCharts';
import DonutCharts from './DonutCharts';
import GaugeCharts from './GaugeCharts';
import ScatterCharts from './ScatterCharts';
import CombinationCharts from './CombinationCharts';
import SparklineCharts from './SparklineCharts';
import BubbleCharts from './BubbleCharts';
import '../scss/styleguide.scss';

document.addEventListener('DOMContentLoaded', () => {
  const elem = document.getElementById('app');
  const store = createStore(reducers, { options: { sparseness: 0, animations: true } });

  ReactDOM.render(
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route component={ Styleguide } path="/">
          <Route name="Line charts" path="line-charts" components={ LineCharts } />
          <Route name="Area charts" path="area-charts" components={ AreaCharts } />
          <Route name="Column charts" path="column-charts" components={ ColumnCharts } />
          <Route name="Bar charts" path="bar-charts" components={ BarCharts } />
          <Route name="Donut charts" path="donut-charts" components={ DonutCharts } />
          <Route name="Gauge charts" path="gauge-charts" components={ GaugeCharts } />
          <Route name="Scatter charts" path="scatter-charts" components={ ScatterCharts } />
          <Route name="Bubble charts" path="bubble-charts" components={ BubbleCharts } />
          <Route
            name="Combination charts"
            path="combination-charts"
            components={ CombinationCharts }
          />
          <Route name="Sparkline charts" path="sparkline-charts" components={ SparklineCharts } />
          <IndexRedirect to="/line-charts" />
        </Route>
      </Router>
    </Provider>
  , elem);
});
