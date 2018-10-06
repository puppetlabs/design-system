import React from 'react';
import classNames from 'classnames';
import { hot } from 'react-hot-loader'; // this should only be done in the top level App component
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Header } from '@puppet/react-components';

import i18n from 'i18n';
import Logo from 'components/Logo';
import Home from 'routes/Home';
import NotFound from 'routes/NotFound';

import styles from './App.module.scss';

const App = () => (
  <I18nextProvider i18n={i18n}>
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
  </I18nextProvider>
);

export default hot(module)(App);
