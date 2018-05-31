import React from 'react';
import styles from './Landing.css';
import path from './hero.png';
import typography from '../../../../src/styles/typography.css';
import StyleguideContent from '../StyleguideContent';

const Landing = () => (
  <StyleguideContent>
    <div className={styles.landing}>
      <h1>Welcome to the Puppet product Styleguide</h1>
      <p>
        This guide is your resource for designing and implementing user
        interfaces consistent with Puppet&apos;s design principles and system.
      </p>
      <img
        className={styles.hero}
        src={path}
        alt="hero illustration"
        width="743"
        height="204"
      />
      <div className={styles.mainContent}>
        <div className={typography.heading3}>How to use this guide</div>
        <p>
          The sections at left provide reusable components as well as guidelines
          for using color, typography, and other elements in our products.
          Source files and code examples are available for these items,
          relieving you of the burden of creating UI components from scratch.
        </p>
        <div className={typography.heading3}>This guide is a guide</div>
        <p>
          We recognize that this guide will serve as a resource for a majority
          of product needs, but that there will always be exceptions. When
          creating new design elements, or building new components, this guide
          should serve as a reference, helping you to maintain the underlying
          intent of our design system in the creation of any new elements.
        </p>
      </div>
    </div>
  </StyleguideContent>
);

export default Landing;
