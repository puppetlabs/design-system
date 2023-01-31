/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line no-shadow
const Arrow = ({ arrowRef, className, style, attributes }) => {
  const { transform, ...rest } = style;
  const rotate = `${transform} rotate(45deg)`;

  return (
    <span
      id="rc-popup-menu-arrow"
      className={className}
      style={{ transform: rotate, ...rest }}
      {...attributes}
      ref={arrowRef}
    />
  );
};

export default Arrow;
