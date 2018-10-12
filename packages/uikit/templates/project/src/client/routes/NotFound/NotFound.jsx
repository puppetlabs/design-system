import React from 'react';
import { func } from 'prop-types';
import { Heading } from '@puppet/react-components';

import styles from './NotFound.module.scss';

const propTypes = {
  t: func.isRequired,
};

const NotFound = ({ t }) => (
  <div className={styles.notFound}>
    <Heading as="h1">{t('notFound')}</Heading>
  </div>
);

NotFound.propTypes = propTypes;

export default NotFound;
