import React from 'react';
import Portal from 'react-portal';

const portal = function portal(Base, opts = {}) {
  const defaultProps = { isOpened: true };

  const component = props => {
    return (
      <Portal isOpened={ props.isOpened } onClose={ props.onClose } { ...opts }>
        <Base { ...props } />
      </Portal>
    );
  };

  component.defaultProps = defaultProps;

  return component;
};

export default portal;
