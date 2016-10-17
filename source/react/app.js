import React from 'react';
import ReactDOM from 'react-dom';
import Styleguide from './styleguide/Styleguide';
import '../scss/library/all.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Styleguide />, document.getElementById('app'));
});
