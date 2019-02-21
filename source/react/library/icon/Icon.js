import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { ICON_CONFIG } from '../../constants';
import icons from './icons';

// These are defined here so they render in the styleguide props list
const AVAILABLE_SIZES = ['large', 'medium', 'small', 'tiny'];
const AVAILABLE_ICONS = [
  'account',
  'activity',
  'alert',
  'annotate',
  'area-chart',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
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
  'engagement',
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
  'kebab-h',
  'kebab-v',
  'key',
  'kpi',
  'layers',
  'line',
  'line-chart',
  'link',
  'list',
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
  'report',
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
  'spinner',
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

  // Let's define the svg and viewbox if not passed in as props
  if (!svg && icon) {
    const hasDefault = !!icon.svg;
    const getScaledIcon = variant => icon.variants && icon.variants[variant];
    const scaledIcon = getScaledIcon(size);

    const defineElements = (config, variant) => {
      ({ svg } = config);
      viewBox = viewBox || ICON_CONFIG[variant].viewBox;
    };

    if (scaledIcon) {
      // If a unique svg exists for a specific size, let's use it
      defineElements(scaledIcon, size);
    } else if (hasDefault) {
      // Else if there isn't a unique svg for the size,
      // let's use the default svg and scale it accordingly
      defineElements(icon, 'default');
    } else {
      // Else if there isn't a unique svg for the size,
      // and there isn't a default svg to scale,
      // let's choose the largest available variant and scale it accordingly
      const largestSize = AVAILABLE_SIZES.find(alt => getScaledIcon(alt));
      const largestIcon = getScaledIcon(largestSize);

      defineElements(largestIcon, largestSize);
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
