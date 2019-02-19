import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { iconSizes, iconDefaultSize } from '../../constants';
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
  size: iconDefaultSize,
  height: null,
  width: null,
  svg: null,
  viewbox: null,
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
  let icon = null;

  const getProperty = property => {
    // If a unique icon variant exists for a specific size, use it
    // otherwise, use the default icon and size it accordingly
    const scaledIcon = `${type}-${size}`;

    const { [property]: prop } = icons[scaledIcon] || icons[type];

    return prop;
  };

  if (!svg) {
    svg = getProperty('svg');
  }

  if (!viewBox) {
    viewBox = getProperty('viewBox');
  }

  switch (size) {
    case 'tiny':
      styles.height = iconSizes.tiny;
      styles.width = iconSizes.tiny;
      break;
    case 'small':
      styles.height = iconSizes.small;
      styles.width = iconSizes.small;
      break;
    case 'medium':
      styles.height = iconSizes.medium;
      styles.width = iconSizes.medium;
      break;
    case 'large':
      styles.height = iconSizes.large;
      styles.width = iconSizes.large;
      break;
    default:
      styles.height = iconDefaultSize;
      styles.width = iconDefaultSize;
  }

  if (svg) {
    const classNames = classnames('rc-icon', `rc-icon-${type}`, className);

    icon = (
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

  return icon;
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
