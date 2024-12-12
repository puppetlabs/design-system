import PropTypes from 'prop-types';
import React from 'react';
import { Transition } from 'react-transition-group';
import { ANIMATION_TIMING } from '../constants';

const duration = ANIMATION_TIMING;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  pointerEvents: 'none',
  opacity: 0,
};

const transitionStyles = {
  entering: {
    pointerEvents: 'all',
    opacity: 0,
  },
  entered: {
    opacity: 1,
    pointerEvents: 'all',
  },
  exited: {
    pointerEvents: 'none',
    opacity: 0,
  },
};

const propTypes = {
  in: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  in: false,
  children: null,
};

const FadeInAndOut = (props) => {
  const { in: inProp } = props;

  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => {
        const { children } = props;
        if (!children) {
          return null;
        }

        return React.cloneElement(children, {
          style: { ...defaultStyle, ...transitionStyles[state] },
        });
      }}
    </Transition>
  );
};

FadeInAndOut.propTypes = propTypes;
FadeInAndOut.defaultProps = defaultProps;

export default FadeInAndOut;
