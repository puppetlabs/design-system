import React from 'react';
import icons from './icons.js';

const propTypes = {
  height: React.PropTypes.string,
  width: React.PropTypes.string,
  type: React.PropTypes.string,
};

const defaultProps = {
  height: '30px',
  width: '30px',
};

const defaultViewBox = {
  loader: '0 0 40 40',
  default: '0 0 30 30',
};

const Icon = (props) => {
  const type = props.type;
  const height = props.height;
  const width = props.width;
  let viewBox = props.viewBox;

  if (!viewBox) {
    if (defaultViewBox[type]) {
      viewBox = defaultViewBox[type];
    } else {
      viewBox = defaultViewBox.default;
    }
  }

  let icon = icons[type];

  if (icon) {
    icon = (
      <svg width={ width } height={ height } viewBox={ viewBox }>{ icon }</svg>
    );
  }

  return icon;
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
