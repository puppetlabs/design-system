import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import logos from './logos';
import { path } from '../../helpers/statics';

export const SUPPORTED_LOGOS = [
  'container-registry',
  'discovery',
  'enterprise',
  'insights',
  'pipelines',
];

const propTypes = {
  /** A string specifying the product name from one of the supported set */
  product: PropTypes.oneOf(SUPPORTED_LOGOS).isRequired,
  /** Logo type (full or bug) */
  type: PropTypes.oneOf(['full', 'bug']),
  /** Boolean "inverted" option for logo display on dark backgrounds */
  inverted: PropTypes.bool,
  /** @ignore This prop produces a condensed version of the full logo for use *only in the sidebar component* */
  condensed: PropTypes.bool,
  /** Optional className. Additionally, other event handlers and and props are propagated to the inner svg element for use as needed */
  className: PropTypes.string,
};

const defaultProps = {
  type: 'full',
  inverted: false,
  condensed: false,
  className: '',
};

const Logo = ({ product, type, inverted, condensed, className, ...rest }) => {
  const svgDef = path([product, type], logos);

  if (!svgDef) {
    return null;
  }

  const { svg, twoLine, viewBox } = svgDef;

  return (
    <svg
      viewBox={viewBox}
      className={classNames(
        'rc-logo',
        `rc-logo-type-${type}`,
        {
          'rc-logo-inverted': inverted,
          'rc-logo-condensed': condensed,
          'rc-logo-two-line': twoLine,
        },
        className,
      )}
      {...rest}
    >
      {svg}
    </svg>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
