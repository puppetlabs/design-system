import React from 'react';
import { hot } from 'react-hot-loader'; // this should only be done in the top level App component
import { Header } from '@puppet/react-components';
import styles from './App.module.scss';

import Logo from '../Logo';

const nav = [
  { icon: 'gear', label: 'Settings', key: 'settings' },
  { icon: 'key', label: 'Tokens', key: 'tokens' },
  { icon: 'user', label: 'User', key: 'user' },
];

const App = () => (
  <div className={styles.app}>
    <Header
      nav={nav}
      onLogoClick={() => console.log('logo clicked')}
      onNavClick={console.log}
      logo={<Logo />}
    />
  </div>
);

export default hot(module)(App);
