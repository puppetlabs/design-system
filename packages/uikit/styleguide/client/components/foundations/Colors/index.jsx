import React from 'react';
import colors from '!raw-loader!../../../../../src/styles/colors.css'; // eslint-disable-line
import StyleguideContent from '../../StyleguideContent';
import styles from './colors.css';

const parseVariables = data => {
  const re = /--(.*): (.*);/g;
  let loop = true;
  const variables = {};

  while (loop) {
    const match = re.exec(data);
    if (match) {
      const key = match[1];
      const value = match[2];
      variables[key] = value;
    } else {
      loop = false;
    }
  }

  return variables;
};

const colorVariables = parseVariables(colors);

const Colors = () => (
  <StyleguideContent>
    <div>
      <h1>Colors</h1>
      <p>
        Colors have inherent meaning for a majority of users, although we do
        recognize that cultural differences amongst our users are plentiful.
        Color is used to draw attention to important elements and those we want
        the user to take action on. To best accommodate all users, our standards
        specify AA web accessibility, including the minimum contrast ratios that
        the WCAG 2.0 specifies for text and background color combinations. This
        helps users who are colorblind or have low vision to better interact
        with our products, and improves usability and readability for all users.
      </p>
      <ul className={styles.colors}>
        {Object.keys(colorVariables).map(name => (
          <li key={name}>
            <div
              className={styles.swatch}
              style={{ backgroundColor: colorVariables[name] }}
            >
              &nbsp;
            </div>
            <p>{name}</p>
            <p>{colorVariables[name]}</p>
          </li>
        ))}
      </ul>
    </div>
  </StyleguideContent>
);

export default Colors;
