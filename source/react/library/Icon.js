import React from 'react';
import icons from './icons';

const propTypes = {
  viewBox: React.PropTypes.string,
  height: React.PropTypes.string,
  width: React.PropTypes.string,
  type: React.PropTypes.string,
  svg: React.PropTypes.element,
};

const defaultProps = {
  height: '30px',
  width: '30px',
};

/**
 * `Icon` renders either an icon svg when given a `type`, or any svg with given
 * an `svg`.
 *
 * @example ../../../docs/Icon.md
 */
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
