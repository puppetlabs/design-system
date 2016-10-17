import React from 'react';
import icons from './icons.js';

const propTypes = {
  size: React.PropTypes.number,
  type: React.PropTypes.string,
};

const defaultProps = {
  size: 30,
};

const Icon = (props) => {
  const type = props.type;
  const pixelSize = `${props.size}px`;
  let icon = icons[type];

  if (icon) {
    icon = <svg x="0px" y="0px" width={ pixelSize } height={ pixelSize } viewBox="0 0 30 30">{ icon }</svg>;
  }

  return icon;
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
