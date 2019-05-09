import React from 'react';
import { string } from 'prop-types';
import { Heading, Text } from '@puppet/react-components';
import './PageTitle.scss';

const propTypes = {
  title: string.isRequired,
  subtitle: string,
};

const defaultProps = {
  subtitle: '',
};

const PageTitle = ({ title, subtitle }) => (
  <div className="page-title">
    <Heading as="h3">{title}</Heading>
    {subtitle && <Text color="medium">{subtitle}</Text>}
  </div>
);

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

export default PageTitle;
