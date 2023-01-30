/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line no-shadow
const Arrow = ({ arrowRef, className, style, attributes }) => (
  <span
    id="rc-popup-menu-arrow"
    className={className}
    style={style}
    {...attributes}
    ref={arrowRef}
  />
);

export default Arrow;
