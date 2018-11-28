import React from 'react';
import PropTypes from 'prop-types';

// This HOC has the same API as portal, but renders the JSX inline
// instead of in a portal.

const propTypes = {
  isOpened: PropTypes.bool,
};

const defaultProps = {
  isOpened: true,
};

const togglable = function togglable(Base) {
  const component = props => {
    let jsx = null;

    if (props.isOpened) {
      jsx = <Base {...props} />;
    }

    return jsx;
  };

  component.propTypes = propTypes;
  component.defaultProps = defaultProps;

  return component;
};

export default togglable;
