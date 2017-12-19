import React from 'react';
import Portal from 'react-portal';

const propTypes = {
  isOpened: React.PropTypes.bool,
};

const defaultProps = {
  isOpened: true,
};

const portal = function portal(Base) {
  const component = props => (
    <Portal isOpened={ props.isOpened }>
      <Base { ...props } />
    </Portal>
  );

  component.propTypes = propTypes;
  component.defaultProps = defaultProps;

  return component;
};

export default portal;
