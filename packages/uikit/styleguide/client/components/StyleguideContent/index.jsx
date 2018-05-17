import { node } from 'prop-types';
import React from 'react';
import styles from './StyleguideContent.css';

const StyleguideContent = ({ children }) => (
  <div className={styles.content}>{children}</div>
);

StyleguideContent.propTypes = {
  children: node,
};

StyleguideContent.defaultProps = {
  children: '',
};

export default StyleguideContent;
