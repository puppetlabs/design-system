import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import Text from '../text/Text';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: undefined,
};

const BreadcrumbSection = ({ children }) => (
  <>
    <Text className="rc-breadcrumb-section" color="medium" size="tiny">
      {children}
    </Text>
    <Icon type="chevron-right" />
  </>
);

BreadcrumbSection.propTypes = propTypes;
BreadcrumbSection.defaultProps = defaultProps;

export default BreadcrumbSection;
