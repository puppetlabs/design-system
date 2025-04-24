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
  'relay',
  'pipelines',
  'remediate',
  'comply',
  'security-compliance-management',
  'continuous-delivery',
  'puppet-standalone',
  'puppet-general-new',
  'puppet-cloud',
];

const propTypes = {
  /** A string specifying the product name from one of the supported set */
  product: PropTypes.oneOfType([
    PropTypes.oneOf(SUPPORTED_LOGOS),
    PropTypes.string,
  ]).isRequired,
  /** Logo type (full or bug) */
  type: PropTypes.oneOf(['full', 'bug']),
  /** Boolean "inverted" option for logo display on dark backgrounds */
  inverted: PropTypes.bool,
  /** @ignore This prop produces an expanded version of the full logo for use *only in the sidebar component* */
  expanded: PropTypes.bool,
  /** Optional className. Additionally, other event handlers and and props are propagated to the inner svg element for use as needed */
  className: PropTypes.string,
};

const defaultProps = {
  type: 'full',
  inverted: false,
  expanded: false,
  className: '',
};

const Logo = ({ product, type, inverted, expanded, className, ...rest }) => {
  const svgDef = path([product, type], logos) || path(['puppet', type], logos);

  const { svg, twoLine, viewBox } = svgDef(product);

  return (
    <svg
      viewBox={viewBox}
      className={classNames(
        'rc-logo',
        `rc-logo-type-${type}`,
        {
          'rc-logo-inverted': inverted,
          'rc-logo-expanded': expanded,
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
Logo.SUPPORTED_LOGOS = SUPPORTED_LOGOS;

export default Logo;
