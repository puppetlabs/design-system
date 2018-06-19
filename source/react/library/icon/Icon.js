import PropTypes from 'prop-types';
import React from 'react';
import icons from './icons';

const propTypes = {
  viewBox: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  type: PropTypes.string,
  svg: PropTypes.element,
};

const defaultProps = {
  height: '30px',
  width: '30px',
};

const Icon = (props) => {
  const { width, type, height } = props;
  const styles = {
    width,
    height,
  };
  let svg = props.svg;
  let viewBox = props.viewBox;
  let icon = null;

  if (!svg && icons[type]) {
    svg = icons[type].svg;
  }

  if (!viewBox && icons[type]) {
    viewBox = icons[type].viewBox;
  }

  if (svg) {
    const className = `rc-icon rc-icon-${type}`;

    icon = (
      <svg
        className={ className }
        width={ width }
        height={ height }
        viewBox={ viewBox }
        style={ styles }
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
