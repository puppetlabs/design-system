import React from 'react';
import { render } from 'react-dom';
import Button from '../../src/components/Button';
import '../../src/styles/globals.css';
import '../../src/styles/typography.css';

const App = () => (
  <div>
    <div>Puppet Styleguide</div>
    <Button />
  </div>
);

render(<App />, document.getElementById('root'));
