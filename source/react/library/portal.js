import React from 'react';
import Portal from 'react-portal';

const portal = function portal(Base, opts = {}) {
  return (props) => {
    const isOpened = {}.hasOwnProperty.call(props, 'isOpened') ? props.isOpened : true;

    return (
      <Portal isOpened={ isOpened } { ...opts }>
        <Base { ...props } />
      </Portal>
    );
  };
};

export default portal;
