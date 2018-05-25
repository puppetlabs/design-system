import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import ButtonStyleguide from '../../src/components/Button/styleguide';
import InputStyleguide from '../../src/components/Input/styleguide';
import LinkStyleguide from '../../src/components/Link/styleguide';
import HeaderStyleguide from '../../src/components/Header/styleguide';
import CardStyleguide from '../../src/components/Card/styleguide';
import './index.css';

if (module.hot) {
  module.hot.accept();
}

const components = [
  {
    path: '/components/button',
    name: 'Button',
    Component: ButtonStyleguide,
  },
  {
    path: '/components/link',
    name: 'Link',
    Component: LinkStyleguide,
  },
  {
    path: '/components/Header',
    name: 'Header',
    Component: HeaderStyleguide,
  },
  {
    path: '/components/card',
    name: 'Card',
    Component: CardStyleguide,
  },
  {
    path: '/components/Input',
    name: 'Input',
    Component: InputStyleguide,
  },
];

render(<App components={components} />, document.getElementById('root'));
