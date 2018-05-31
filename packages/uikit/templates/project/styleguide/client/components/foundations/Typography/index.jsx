import React from 'react';
import styles from './typography.css';
import typography from '../../../../../src/styles/typography.css';
import StyleguideContent from '../../StyleguideContent';

const Typography = () => (
  <StyleguideContent>
    <div>
      <div className={typography.heading1}>Typography</div>
      <p>
        Typography is a foundational element of good product design, when
        applied appropriately. Our products use a combination of three type
        families, their various weights, and a range of type sizes to
        communicate clearly to our users.
      </p>
      <div className={typography.heading3}>Families</div>
      <p>
        Our products use the following three families:
        <br />
        <span className={typography.bodyBold}>Calibre</span> Used for headlines,
        titles, navigation, visualizations, and other primary elements.
        <br />
        <span className={typography.bodyBold}>Open Sans</span> Used for body
        copy and general UI elements and content.
        <br />
        <span className={typography.bodyBold}>Inconsolata</span> Used to denote
        code samples only.
      </p>
      <div className={typography.heading3}>Type styles and usage</div>
      <div className={styles.typeExamples}>
        <div className={typography.heading4}>Style</div>
        <div className={typography.heading4}>Family</div>
        <div className={typography.heading4}>Weight</div>
        <div className={typography.heading4}>Size/Line-height</div>
        <div className={typography.heading4}>Color</div>

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

        <div className={typography.heading3}>Heading 3</div>
        <div>Calibre</div>
        <div>500 Medium</div>
        <div>20px/24px</div>
        <div>UI-3</div>

        <div className={typography.heading4}>Heading 4</div>
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
