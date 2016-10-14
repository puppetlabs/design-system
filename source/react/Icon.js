import React from 'react';
import icons from './icons.js';

const propTypes = {
  size: React.PropTypes.number,
  type: React.PropTypes.string,
};

const Icon = (props) => {
  const type = props.type;
  let icon = null;

  if (icons[type]) {
    icon = <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30">{ icon }</svg>;
  }

  return icon;
};

Icon.propTypes = propTypes;

export default Icon;
