import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /** Is the page loading? If true, page content is hidden. When it transitions from true to false, content will fade in */
  loading: PropTypes.bool,
  /** Type governs general aesthetic. Primary is white, secondary is light gray */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** Governs amount of padding. Standard (medium) is 32px */
  padding: PropTypes.oneOf(['medium', 'none']),
  /** If true, loading animation will be delayed by one half-second. This is designed to play well with other types of loading animations */
  delayed: PropTypes.bool,
  /** class applied to outer element */
  className: PropTypes.string,
  /** class applied to inner element */
  innerClassName: PropTypes.string,
  /** Page content */
  children: PropTypes.node,
};

const defaultProps = {
  loading: false,
  type: 'primary',
  padding: 'medium',
  delayed: false,
  className: '',
  innerClassName: '',
  children: null,
};

const PageContent = ({
  loading,
  type,
  padding,
  delayed,
  children,
  className,
  innerClassName,
  ...rest
}) => {
  // This logic prevents the delayed load-in effect when the component was never marked loading to begin with
  const [neverLoading, setNeverLoading] = useState(true);

  useEffect(() => {
    if (delayed && loading) {
      setNeverLoading(false);
    }
  }, [loading]);

  return (
    <div
      className={classNames(
        'rl-page-content',
        `rl-page-content-${type}`,
        `rl-page-content-padding-${padding}`,
        {
          'rl-page-content-delayed': delayed && !neverLoading,
        },
        className,
      )}
      {...rest}
    >
      {!loading && (
        <div className={classNames('rl-page-content-inner', innerClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};

PageContent.propTypes = propTypes;
PageContent.defaultProps = defaultProps;

export default PageContent;
