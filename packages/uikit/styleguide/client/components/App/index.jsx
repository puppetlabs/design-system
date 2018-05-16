import classNames from 'classnames';
import { arrayOf, shape, string, element } from 'prop-types';
import { map } from 'ramda';
import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ComponentRoute from './ComponentRoute';
import Landing from '../Landing';
import SideNav from '../SideNav';
import styles from './App.css';
import typography from '../../../../src/styles/typography.css';

const App = ({ components }) => (
  <Router>
    <div className={classNames(typography.body, styles.body)}>
      <SideNav components={components} />
      <div className={styles.content}>
        <Switch>
          {map(ComponentRoute, components)}
          <Route component={Landing} />
        </Switch>
      </div>
    </div>
  </Router>
);

App.propTypes = {
  components: arrayOf(
    shape({
      name: string,
      path: string,
      Component: element,
    }),
  ),
};

App.defaultProps = {
  components: [],
};

export default hot(module)(App);
