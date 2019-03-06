import React from 'react';
import { func } from 'prop-types';
import { Heading } from '@puppet/react-components';

import './NotFound.scss';

const propTypes = {
  t: func.isRequired,
};

const NotFound = ({ t }) => (
  <div className="route-not-found">
    <Heading as="h1">{t('notFound')}</Heading>
  </div>
);

NotFound.propTypes = propTypes;

export default NotFound;
