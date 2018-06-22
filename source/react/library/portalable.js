import React from 'react';
import Portal from './Portal';

// This HOC wraps passed content in a native react portal.

const portalable = function portalable(Base) {
  const component = props => (
    <Portal content={ <Base { ...props } /> } { ...props } />
  );

  return component;
};

export default portalable;
