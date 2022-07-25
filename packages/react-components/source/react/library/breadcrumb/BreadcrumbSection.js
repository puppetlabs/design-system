import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Text from '../text';
import Hyperlink from '../link';

const propTypes = {
  /** The route to render. Can be either a link or some plain text (current route)  */
  children: PropTypes.node,
  /** Set internally--Is the breadcrumb the leaf element? */
  active: PropTypes.bool,
  /** Whether or not the breadcrumb should be rendered as a link or plain text */
  disabled: PropTypes.bool,
};

const defaultProps = {
  children: undefined,
  active: false,
  disabled: false,
};

const BreadcrumbSection = ({ children, active, disabled, ...props }) => {
  const chevron = active ? null : (
    <Icon type="chevron-right" aria-hidden="true" />
  );

  let crumb = (
    <li>
      <Hyperlink
        className="rc-breadcrumb-section"
        color="medium"
        size="tiny"
        tabIndex="0"
        {...props}
      >
        {children}
      </Hyperlink>
      {chevron}
    </li>
  );

  if (active || disabled) {
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
        {chevron}
      </li>
    );
  }

  return crumb;
};

BreadcrumbSection.propTypes = propTypes;
BreadcrumbSection.defaultProps = defaultProps;

export default BreadcrumbSection;
