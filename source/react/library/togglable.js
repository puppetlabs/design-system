import React from 'react';
import PropTypes from 'prop-types';

// This HOC has the same API as portal, but renders the JSX inline
// instead of in a portal.

const togglable = function togglable(Base) {
  const propTypes = { isOpened: PropTypes.bool };
  const defaultProps = { isOpened: true };

  const component = ({ isOpened, ...props }) => {
    let jsx = null;

    if (isOpened) {
      jsx = <Base {...props} />;
    }

    return jsx;
  };

  component.propTypes = propTypes;
  component.defaultProps = defaultProps;

  return component;
};

export default togglable;
