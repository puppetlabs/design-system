import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { iconConfig } from '../../constants';
import icons from './icons';

const propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  height: PropTypes.string,
  width: PropTypes.string,
  svg: PropTypes.element,
  viewBox: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  type: null,
  size: iconConfig.default.size,
  height: null,
  width: null,
  svg: null,
  viewBox: null,
  className: '',
};

const Icon = props => {
  const {
    className,
    width,
    type,
    height,
    size,
    svg: propsSvg,
    viewBox: propsViewBox,
  } = props;
  const styles = { width, height };

  let svg = propsSvg;
  let viewBox = propsViewBox;
  const icon = icons[type];

  if (!svg && icon) {
    // If a unique variant exists for a specific size, use it
    // otherwise, use the default icon and scale it accordingly
    const scaledIcon = icon.variants && icon.variants[size];

    if (scaledIcon) {
      viewBox = viewBox || iconConfig[size].viewBox;

      svg = scaledIcon.svg;
    } else {
      viewBox = viewBox || iconConfig.default.viewBox;

      svg = icon.svg;
    }
  }

  switch (size) {
    case 'tiny':
      styles.height = iconConfig.tiny.size;
      styles.width = iconConfig.tiny.size;
      break;
    case 'small':
      styles.height = iconConfig.small.size;
      styles.width = iconConfig.small.size;
      break;
    case 'medium':
      styles.height = iconConfig.medium.size;
      styles.width = iconConfig.medium.size;
      break;
    case 'large':
      styles.height = iconConfig.large.size;
      styles.width = iconConfig.large.size;
      break;
    default:
      styles.height = iconConfig.default.size;
      styles.width = iconConfig.default.size;
  }

  if (svg) {
    const classNames = classnames('rc-icon', `rc-icon-${type}`, className);

    return (
      <svg
        className={classNames}
        width={width}
        height={height}
        viewBox={viewBox}
        style={styles}
      >
        {svg}
      </svg>
    );
  }

  return null;
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
