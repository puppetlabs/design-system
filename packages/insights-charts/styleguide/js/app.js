import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import Styleguide from './Styleguide';
import LineCharts from './LineCharts';
import ColumnCharts from './ColumnCharts';
import AreaCharts from './AreaCharts';
import DonutCharts from './DonutCharts';
import CombinationCharts from './CombinationCharts';
import SparklineCharts from './SparklineCharts';
import '../scss/styleguide.scss';

document.addEventListener('DOMContentLoaded', () => {
  const elem = document.getElementById('app');

  ReactDOM.render(
    <Router history={ browserHistory }>
      <Route component={ Styleguide } path="/">
        <Route name="Line charts" path="line-charts" components={ LineCharts } />
        <Route name="Area charts" path="area-charts" components={ AreaCharts } />
        <Route name="Column charts" path="column-charts" components={ ColumnCharts } />
        <Route name="Donut charts" path="donut-charts" components={ DonutCharts } />
        <Route
          name="Combination charts"
          path="combination-charts"
          components={ CombinationCharts }
        />
        <Route name="Sparkline charts" path="sparkline-charts" components={ SparklineCharts } />
        <IndexRedirect to="/line-charts" />
      </Route>
    </Router>
  , elem);
});
