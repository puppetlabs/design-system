import React from 'react';
import Portal from './Portal';

const portable = function portable(Base) {
  const component = props => (
    <Portal content={ <Base { ...props } /> } { ...props } />
  );

  return component;
};

export default portable;
