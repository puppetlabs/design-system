import PropTypes from 'prop-types';
import React from 'react';
import { iconSizes } from '../../constants';
import icons from './icons';

const propTypes = {
  viewBox: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  height: PropTypes.string,
  width: PropTypes.string,
  type: PropTypes.string,
  svg: PropTypes.element,
};

const defaultProps = {
  height: '30px',
  width: '30px',
};

const Icon = props => {
  const {
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

  if (!svg && icons[type]) {
    const { svg: altnerateSvg } = icons[type];
    svg = altnerateSvg;
  }

  if (!viewBox && icons[type]) {
    const { viewBox: altnerateViewBox } = icons[type];
    viewBox = altnerateViewBox;
  }

  if (size) {
    switch (size) {
      case 'tiny':
        styles.height = iconSizes.tiny;
        styles.width = iconSizes.tiny;
        break;
      case 'small':
        styles.height = iconSizes.small;
        styles.width = iconSizes.small;
        break;
      case 'large':
        styles.height = iconSizes.large;
        styles.width = iconSizes.large;
        break;
      default:
        styles.height = iconSizes.base;
        styles.width = iconSizes.base;
    }
  }

  if (svg) {
    const className = `rc-icon rc-icon-${type}`;

    icon = (
      <svg
        className={className}
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
