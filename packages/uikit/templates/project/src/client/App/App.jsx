import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader'; // this should only be done in the top level App component
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from 'i18n';
import Home from 'routes/Home';
import NotFound from 'routes/NotFound';
import Sidebar from 'components/Sidebar';

import './App.scss';

const App = () => (
  <Suspense fallback={<div />}>
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="app-main-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </I18nextProvider>
  </Suspense>
);

export default hot(module)(App);
