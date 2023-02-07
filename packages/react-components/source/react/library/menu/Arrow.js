/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line no-shadow
const Arrow = ({ arrowRef, style, attributes }) => {
  const { transform, ...rest } = style;
  const rotate = `${transform} rotate(45deg)`;

  return (
    <span
      id="rc-popup-menu-arrow"
      className="rc-popup-menu-arrow"
      style={{ transform: rotate, ...rest }}
      {...attributes}
      ref={arrowRef}
    />
  );
};

export default Arrow;
