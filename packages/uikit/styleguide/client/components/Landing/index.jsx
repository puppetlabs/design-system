import React from 'react';
import styles from './Landing.css';
import path from './hero.png';

const Landing = () => (
  <div className={styles.landing}>
    <h1>Welcome to Puppet’s Styleguide!</h1>
    <p>
      Your resource for creating user interfaces consistent with the Puppet
      principles, design language, and best practices.
    </p>
    <img src={path} alt="hero illustration" width="743" height="204" />
  </div>
);

export default Landing;
