import React from 'react';
import classNames from 'classnames';
import { hot } from 'react-hot-loader'; // this should only be done in the top level App component
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Header } from '@puppet/react-components';

import Home from 'routes/Home';

import NotFound from 'routes/NotFound';

import Logo from 'components/Logo';

import styles from './App.module.scss';

const App = () => (
  <Router>
    <div className={classNames('rc-content', styles.app)}>
      <Header
        logo={
          <Link to="/">
            <Logo />
          </Link>
        }
      />
      <div className={styles.mainContent}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default hot(module)(App);
