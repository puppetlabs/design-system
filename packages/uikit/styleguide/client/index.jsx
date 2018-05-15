import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import typography from '../../src/styles/typography.css';
import ButtonStyleguide from '../../src/components/Button/styleguide';
import '../../src/styles/globals.css';

const App = () => (
  <Router>
    <div className={typography.body}>
      <Route exact path="/button" component={ButtonStyleguide} />
    </div>
  </Router>
);

render(<App />, document.getElementById('root'));
