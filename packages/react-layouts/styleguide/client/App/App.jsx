import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader'; // this should only be done in the top level App component
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Text } from '@puppet/react-components';

import i18n from 'i18n';
import Home from 'routes/Home';
import Confirmation from 'routes/Confirmation';
import ForgotPassword from 'routes/ForgotPassword';
import ForgotPasswordSent from 'routes/ForgotPasswordSent';
import Login from 'routes/Login';
import NotFound from 'routes/NotFound';
import Sidebar from 'components/Sidebar';

import './App.scss';

const App = () => (
  <Suspense fallback={<div />}>
    <I18nextProvider i18n={i18n}>
      <Router>
        <Text className="app">
          <Sidebar />
          <div className="app-main-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth/confirmation" component={Confirmation} />
              <Route
                exact
                path="/auth/forgot-password"
                component={ForgotPassword}
              />
              <Route
                exact
                path="/auth/forgot-password-sent"
                component={ForgotPasswordSent}
              />
              <Route exact path="/auth/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Text>
      </Router>
    </I18nextProvider>
  </Suspense>
);

export default hot(module)(App);
