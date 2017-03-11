import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Styleguide from './Styleguide';
import LineCharts from './LineCharts';
import '../scss/styleguide.scss';

document.addEventListener('DOMContentLoaded', () => {
  const elem = document.getElementById('app');

  ReactDOM.render(
    <Router history={ browserHistory }>
      <Route component={ Styleguide } path="/">
        <Route path="line-charts" components={ LineCharts } />
        <IndexRoute component={ LineCharts } />
      </Route>
    </Router>
  , elem);
});
