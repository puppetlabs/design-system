import React from 'react';
import styles from './typography.css';
import typography from '../../../../../src/styles/typography.css';
import StyleguideContent from '../../StyleguideContent';

const Typography = () => (
  <StyleguideContent>
    <div>
      <h1>Typography</h1>
      <p>
        Text is the primary way users interact with our content to accomplish
        work, so it’s important to use good typographic principles to establish
        a clear hierarchy and maximize legibility. To best accommodate all
        users, our standards specify AA web accessibility, including the minimum
        contrast ratios that the WCAG 2.0 specifies for text and background
        color combinations (excluding disabled states.) This helps users who are
        colorblind or have low vision to better interact with our products, and
        improves usability and readability for all users.
      </p>
      <h3>Font families and licensing</h3>
      <p>
        The Puppet brand utilizes three individual font families. Calibre is
        used strictly for headlines and titles. Open Sans is used for all other
        UI text elements excluding code samples, which use Inconsolata.
      </p>
      <h3>Line height</h3>
      <p>
        In enterprise applications, the need for longform text is rare. More
        often, application design involves many small bits of text that all
        represent the user’s data. This text is spaced intentionally to maintain
        distinction between different types and rows of data.
      </p>
      <div className={styles.typeExamples}>
        <div className={typography.heading1}>Heading 1</div>
        <div>Calibre</div>
        <div>600 Semibold</div>
        <div>40px/48px</div>
        <div>UI-3</div>

        <div className={typography.heading2}>Heading 2</div>
        <div>Calibre</div>
        <div>400 Regular</div>
        <div>30px/36px</div>
        <div>UI-3</div>

        <div className={typography.heading3}>H3 support subheader</div>
        <div>Calibre</div>
        <div>500 Medium</div>
        <div>20px/24px</div>
        <div>UI-3</div>

        <div className={typography.heading4}>H4 lorem ipsum</div>
        <div>Calibre</div>
        <div>500 Medium</div>
        <div>18px/22px</div>
        <div>UI-3</div>

        <div className={typography.numbersH1}>Numbers H1</div>
        <div>Calibre</div>
        <div>300 Light</div>
        <div>80px/95px</div>
        <div>UI-3</div>

        <div className={typography.numbersH2}>Numbers H2</div>
        <div>Calibre</div>
        <div>400 Regular</div>
        <div>14px/20px</div>
        <div>UI-3</div>

        <div className={typography.actionPrimary}>Action Primary</div>
        <div>Calibre</div>
        <div>600 Semibold</div>
        <div>16px/20px</div>
        <div>UI-1</div>

        <div className={typography.actionSecondary}>Action Secondary</div>
        <div>Calibre</div>
        <div>500 Medium</div>
        <div>16px/20px</div>
        <div>UI-1</div>

        <div className={typography.bodyBold}>Body Bold</div>
        <div>OpenSans</div>
        <div>700 Bold</div>
        <div>14px/20px</div>
        <div>UI-3</div>

        <div className={typography.body}>Body</div>
        <div>OpenSans</div>
        <div>400 Regular</div>
        <div>14px/20px</div>
        <div>UI-3</div>

        <div className={typography.body}>Body Link</div>
        <div>OpenSans</div>
        <div>400 Regular</div>
        <div>14px/20px</div>
        <div>Link_Default</div>

        <div className={typography.bodySmallBold}>Body Small Bold</div>
        <div>OpenSans</div>
        <div>700 Bold</div>
        <div>12px/18px</div>
        <div>UI-3</div>

        <div className={typography.bodySmall}>Body Small</div>
        <div>OpenSans</div>
        <div>400 Regular</div>
        <div>12px/18px</div>
        <div>UI-3</div>

        <div className={typography.bodySmall}>Body Small Link</div>
        <div>OpenSans</div>
        <div>400 Regular</div>
        <div>12px/18px</div>
        <div>Link_Default</div>
      </div>
    </div>
  </StyleguideContent>
);

export default Typography;
