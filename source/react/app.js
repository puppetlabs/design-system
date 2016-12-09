import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Styleguide from './styleguide/Styleguide';
import Buttons from './styleguide/Buttons';
import Forms from './styleguide/Forms';
import Cards from './styleguide/Cards';
import Icons from './styleguide/Icons';
import Modals from './styleguide/Modals';
import Switches from './styleguide/Switches';
import Tabs from './styleguide/Tabs';
import '../scss/library/all.scss';
import '../scss/styleguide.scss';

document.addEventListener('DOMContentLoaded', () => {
  const elem = document.getElementById('app');

  ReactDOM.render(
    <Router history={ browserHistory }>
      <Route component={ Styleguide } path="/">
        <Route path="buttons" components={ Buttons } />
        <Route path="modals" components={ Modals } />
        <Route path="cards" components={ Cards } />
        <Route path="forms" components={ Forms } />
        <Route path="icons" components={ Icons } />
        <Route path="switches" components={ Switches } />
        <Route path="tabs" components={ Tabs } />
        <IndexRoute component={ Buttons } />
      </Route>
    </Router>
  , elem);
});
