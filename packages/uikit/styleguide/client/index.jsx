import React from 'react';
import { render } from 'react-dom';
import Button from '../../src/components/Button';
import typography from '../../src/styles/typography.css';
import '../../src/styles/globals.css';

const App = () => (
  <div className={typography.body}>
    <div>Puppet Styleguide</div>
    <Button />
  </div>
);

render(<App />, document.getElementById('root'));
