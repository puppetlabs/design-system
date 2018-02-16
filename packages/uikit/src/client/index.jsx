import React from 'react';
import { render } from 'react-dom';
import styles from './index.css';

const App = () => <div className={styles.test}>I am a div</div>;

render(<App />, document.getElementById('root'));
