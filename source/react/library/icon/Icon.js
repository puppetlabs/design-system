import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { ICON_CONFIG, AVAILABLE_ICONS } from './constants';
import icons from './icons';

const propTypes = {
  /** Pick your icon */
  type: PropTypes.oneOf(AVAILABLE_ICONS),
  /** Choose your size */
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  /** Or pass in your own svg and viewbox */
  svg: PropTypes.element,
  viewBox: PropTypes.string,
  /** Optional additional classes */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
};

const defaultProps = {
  type: null,
  size: ICON_CONFIG.default.size,
  svg: null,
  viewBox: null,
  className: '',
  style: {},
};

const Icon = props => {
  const {
    className,
    type,
    size,
    svg: propsSvg,
    viewBox: propsViewBox,
    style,
  } = props;

  let svg = propsSvg;
  let viewBox = propsViewBox;
  const icon = icons[type];

  // If a unique variant exists for a specific size, let's use it
  // otherwise, we'll use the default icon and scale it accordingly
  if (!svg && icon) {
    const scaledIcon = icon.variants && icon.variants[size];

    if (scaledIcon) {
      ({ svg } = scaledIcon);

      viewBox = viewBox || ICON_CONFIG[size].viewBox;
    } else {
      ({ svg } = icon);

      viewBox = viewBox || ICON_CONFIG.default.viewBox;
    }
  }

  if (svg) {
    const classNames = classnames('rc-icon', `rc-icon-${type}`, className);

    return (
      <svg
        {...props}
        className={classNames}
        viewBox={viewBox}
        style={{
          width: ICON_CONFIG[size].size,
          height: ICON_CONFIG[size].size,
          ...style,
        }}
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
