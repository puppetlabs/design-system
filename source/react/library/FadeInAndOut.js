import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 200;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exited: { opacity: 0 },
};

const FadeInAndOut = (props) => {
  return (
    <Transition in={ props.in } timeout={ duration }>
      {(state) => {
        if (!props.children) {
          return null;
        }

        return React.cloneElement(props.children, {
          style: { ...defaultStyle, ...transitionStyles[state] },
        });
      }}
    </Transition>
  );
};

export default FadeInAndOut;
