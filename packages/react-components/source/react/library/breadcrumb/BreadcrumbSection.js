import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Text from '../text';
import Hyperlink from '../link';

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
    <li>
      <Hyperlink
        className="rc-breadcrumb-section"
        color="medium"
        size="tiny"
        tabindex="0"
        {...props}
      >
        {children}
      </Hyperlink>
      <Icon type="chevron-right" aria-hidden="true" />
    </li>
  );

  if (active) {
    crumb = (
      <li>
        <Text
          aria-current="page"
          className="rc-breadcrumb-section"
          color="medium"
          size="tiny"
        >
          {children}
        </Text>
      </li>
    );
  }

  return crumb;
};

BreadcrumbSection.propTypes = propTypes;
BreadcrumbSection.defaultProps = defaultProps;

export default BreadcrumbSection;
