import React from 'react';
import styles from './colors.css';

const Colors = () => (
  <div>
    <h1>Colors</h1>
    <p>
      Colors have inherent meaning for a majority of users, although we do
      recognize that cultural differences amongst our users are plentiful. Color
      is used to draw attention to important elements and those we want the user
      to take action on. To best accommodate all users, our standards specify AA
      web accessibility, including the minimum contrast ratios that the WCAG 2.0
      specifies for text and background color combinations. This helps users who
      are colorblind or have low vision to better interact with our products,
      and improves usability and readability for all users.
    </p>
    <div className={styles.colors}>
      <ul>
        <li>
          <div className={(styles.circle, styles.ui1)}>&nbsp;</div>
          <p>UI_1</p>
          <p>#000e1c</p>
        </li>
      </ul>
    </div>
  </div>
);

export default Colors;
