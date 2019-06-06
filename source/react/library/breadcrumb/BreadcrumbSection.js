import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import Text from '../text/Text';
import Hyperlink from '../link/Link';

const propTypes = {
  /** The route to render. Can be either a link or some plain text (current route)  */
  children: PropTypes.node,
  /** Set internally--Is the breacrumb the leaf element? */
  active: PropTypes.bool,
};

const defaultProps = {
  children: undefined,
  active: false,
};

const BreadcrumbSection = ({ children, active, ...props }) => {
  let crumb = (
    <>
      <Hyperlink
        className="rc-breadcrumb-section"
        color="medium"
        size="tiny"
        {...props}
      >
        {children}
      </Hyperlink>
      <Icon type="chevron-right" />
    </>
  );

  if (active) {
    crumb = (
      <Text className="rc-breadcrumb-section" color="medium" size="tiny">
        {children}
      </Text>
    );
  }

  return crumb;
};

BreadcrumbSection.propTypes = propTypes;
BreadcrumbSection.defaultProps = defaultProps;

export default BreadcrumbSection;
