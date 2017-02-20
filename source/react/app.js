import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Styleguide from './styleguide/Styleguide';
import Buttons from './styleguide/Buttons';
import ProgressBars from './styleguide/ProgressBars';
import Forms from './styleguide/Forms';
import Cards from './styleguide/Cards';
import Icons from './styleguide/Icons';
import Modals from './styleguide/Modals';
import Dropdowns from './styleguide/Dropdowns';
import Switches from './styleguide/Switches';
import Tabs from './styleguide/Tabs';
import Tooltips from './styleguide/Tooltips';
import Tables from './styleguide/Tables';
import Toggles from './styleguide/Toggles';
import SlideIns from './styleguide/SlideIns';
import Accordions from './styleguide/Accordions';
import '../scss/library/all.scss';
import '../scss/styleguide.scss';

document.addEventListener('DOMContentLoaded', () => {
  const elem = document.getElementById('app');

  ReactDOM.render(
    <Router history={ browserHistory }>
      <Route component={ Styleguide } path="/">
        <Route path="buttons" components={ Buttons } />
        <Route path="progress" components={ ProgressBars } />
        <Route path="modals" components={ Modals } />
        <Route path="dropdowns" components={ Dropdowns } />
        <Route path="cards" components={ Cards } />
        <Route path="forms" components={ Forms } />
        <Route path="icons" components={ Icons } />
        <Route path="switches" components={ Switches } />
        <Route path="tabs" components={ Tabs } />
        <Route path="tooltips" components={ Tooltips } />
        <Route path="tables" components={ Tables } />
        <Route path="toggles" components={ Toggles } />
        <Route path="slideins" components={ SlideIns } />
        <Route path="accordions" components={ Accordions } />
        <IndexRoute component={ Buttons } />
      </Route>
    </Router>
  , elem);
});
