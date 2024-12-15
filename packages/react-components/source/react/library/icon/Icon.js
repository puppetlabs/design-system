import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { ICON_CONFIG } from '../../constants';
import icons from './icons';

// These are defined here so they render in the styleguide props list
const AVAILABLE_SIZES = ['large', 'medium', 'small', 'tiny'];
export const AVAILABLE_ICONS = Object.keys(icons);

const propTypes = {
  /** Choose your icon */
  type: PropTypes.oneOf(AVAILABLE_ICONS),
  /** Optional choose your size */
  size: PropTypes.oneOf(AVAILABLE_SIZES),
  /** Or pass in your own svg... */
  svg: PropTypes.element,
  /** ...and viewbox */
  viewBox: PropTypes.string,
  /** Optional add additional classes */
  className: PropTypes.string,
  /** Optional add additional inline styles */
  style: PropTypes.shape({}),
};

const defaultProps = {
  type: null,
  size: 'medium',
  svg: null,
  viewBox: null,
  className: '',
  style: {},
};

const Icon = (props) => {
  const {
    className,
    type,
    size,
    svg: propsSvg,
    viewBox: propsViewBox,
    style,
    ...rest
  } = props;

  let svg = propsSvg;
  let viewBox = propsViewBox;
  const icon = icons[type];

  // Let's define the svg and viewbox if not passed in as props
  if (!svg && icon) {
    const getScaledIcon = (variant) => icon[variant];
    const scaledIcon = getScaledIcon(size);

    const defineElements = (element, variant) => {
      svg = element;
      viewBox = viewBox || ICON_CONFIG[variant].viewBox;
    };

    if (scaledIcon) {
      // If a unique svg exists for the size requested, let's use it
      defineElements(scaledIcon, size);
    } else {
      // Else if there isn't a unique svg for the size,
      // let's scale down the next largest svg,
      // or if unavailable, scale up the next smallest svg

      const index = AVAILABLE_SIZES.indexOf(size);
      const largerSizes = AVAILABLE_SIZES.slice(0, index).reverse();
      const smallerSizes = AVAILABLE_SIZES.slice(index + 1);

      let closestSize = largerSizes.find((alt) => getScaledIcon(alt));
      closestSize =
        closestSize || smallerSizes.find((alt) => getScaledIcon(alt));
      const closestIcon = getScaledIcon(closestSize);

      defineElements(closestIcon, closestSize);
    }
  }

  if (svg) {
    const classNames = classnames('rc-icon', `rc-icon-${type}`, className);

    return (
      <svg
        width={ICON_CONFIG[size].size}
        height={ICON_CONFIG[size].size}
        className={classNames}
        viewBox={viewBox}
        style={{
          width: ICON_CONFIG[size].size,
          height: ICON_CONFIG[size].size,
          ...style,
        }}
        {...rest}
      >
        {svg}
      </svg>
    );
  }

  return null;
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

Icon.AVAILABLE_SIZES = AVAILABLE_SIZES;
Icon.AVAILABLE_ICONS = AVAILABLE_ICONS;

export default Icon;
