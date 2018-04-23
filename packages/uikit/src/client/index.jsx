import React from 'react';
import { render } from 'react-dom';
import styles from './index.css';
import billandted from './billandted.jpg';

const App = () => (
  <div>
    <div className={styles.test}>Bill and ted</div>
    <img src={billandted} alt="bat" />
  </div>
);

render(<App />, document.getElementById('root'));
