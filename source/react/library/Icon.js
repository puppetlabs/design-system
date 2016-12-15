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

const Icon = (props) => {
  const type = props.type;
  const height = props.height;
  const width = props.width;
  const svg = icons[type].svg;
  const viewBox = icons[type].viewBox;
  let icon;

  if (svg) {
    const className = `rc-icon rc-icon-${type}`;

    icon = (
      <svg
        className={ className }
        width={ width }
        height={ height }
        viewBox={ viewBox }
      >
        { svg }
      </svg>
    );
  }

  return icon;
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
