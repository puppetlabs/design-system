import React from 'react';
import Portal from 'react-portal';

const portal = function portal(Base, opts = {}) {
  return props => <Portal isOpened { ...opts }><Base { ...props } /></Portal>;
};

export default portal;
