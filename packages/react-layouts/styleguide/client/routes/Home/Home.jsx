import React, { Fragment } from 'react';
import { func } from 'prop-types';

import PageTitle from 'components/PageTitle';

const propTypes = {
  t: func.isRequired,
};

const Home = ({ t }) => (
  <Fragment>
    <PageTitle title={t('title')} />
  </Fragment>
);

Home.propTypes = propTypes;

export default Home;
