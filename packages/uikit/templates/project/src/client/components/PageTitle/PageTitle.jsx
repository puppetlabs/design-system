import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text } from '@puppet/react-components';

import styles from './PageTitle.module.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

const defaultProps = {
  subtitle: '',
};

const PageTitle = ({ title, subtitle }) => (
  <div className={styles.pageTitle}>
    <Heading as="h3">{title}</Heading>
    {subtitle && <Text color="medium">{subtitle}</Text>}
  </div>
);

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

export default PageTitle;
