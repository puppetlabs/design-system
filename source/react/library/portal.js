import React from 'react';
import Portal from 'react-portal';

const portal = function portal(Base) {
  const defaultProps = { isOpened: true };

  const component = props => (
    <Portal isOpened={ props.isOpened }>
      <Base { ...props } />
    </Portal>
  );

  component.defaultProps = defaultProps;

  return component;
};

export default portal;
