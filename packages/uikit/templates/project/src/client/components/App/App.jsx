import React from 'react';
import { hot } from 'react-hot-loader'; // this should only be done in the top level App component
import styles from './App.module.scss';

const App = () => <div className={styles.app}>Your React app</div>;

export default hot(module)(App);
