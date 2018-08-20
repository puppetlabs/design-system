import React from 'react';

// This HOC has the same API as portal, but renders the JSX inline
// instead of in a portal.

const togglable = function togglable(Base) {
  const defaultProps = { isOpened: true };

  const component = props => {
    let jsx = null;

    if (props.isOpened) {
      jsx = <Base {...props} />;
    }

    return jsx;
  };

  component.defaultProps = defaultProps;

  return component;
};

export default togglable;
