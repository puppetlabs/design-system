import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { ICON_CONFIG } from '../../constants';
import icons from './icons';

// These are defined here so they render in the styleguide props list
const AVAILABLE_SIZES = ['large', 'medium', 'small', 'tiny'];
const AVAILABLE_ICONS = [
  'activity',
  'alert',
  'annotate',
  'area-chart',
  'audience',
  'attach',
  'bar-chart',
  'basics',
  'bell',
  'book',
  'brush',
  'bubble',
  'build',
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'clipboard',
  'close',
  'circle-check',
  'circle-help',
  'circle-info',
  'circle-plus',
  'code',
  'column-chart',
  'combo',
  'company',
  'connections',
  'csv',
  'data-grid',
  'data',
  'dashboard',
  'deploy',
  'diamond',
  'donut',
  'double-left',
  'double-right',
  'drag-handle',
  'duplicate',
  'email',
  'engagament',
  'excel',
  'eye',
  'filters',
  'gear',
  'grid',
  'hamburger',
  'history',
  'home',
  'image',
  'impact',
  'increment',
  'kebab',
  'kebab-horizontal',
  'key',
  'kpi',
  'layers',
  'line',
  'line-chart',
  'link',
  'list',
  'loader',
  'minus',
  'package',
  'paper',
  'parameters',
  'pdf',
  'pencil',
  'performance',
  'pipeline',
  'plus',
  'private',
  'profile',
  'reports',
  'resize',
  'scatter',
  'search',
  'send',
  'share',
  'shield',
  'sign-out',
  'sort-ascending',
  'sort-descending',
  'sort',
  'square',
  'structure',
  'tag',
  'target',
  'text',
  'time-series',
  'tools',
  'trash',
  'users',
  'versions',
  'wallet',
  'x',
  'zoom-in',
  'zoom-out',
];

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

  // Let's define the svg and viewbox if not passed in as props
  if (!svg && icon) {
    const getScaledIcon = variant => icon[variant];
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

      let closestSize = largerSizes.find(alt => getScaledIcon(alt));
      closestSize = closestSize || smallerSizes.find(alt => getScaledIcon(alt));
      const closestIcon = getScaledIcon(closestSize);

      defineElements(closestIcon, closestSize);
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
