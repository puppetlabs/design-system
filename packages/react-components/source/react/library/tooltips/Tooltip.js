import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TOOLTIP_OFFSET = 6;

const propTypes = {
  anchor: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  target: PropTypes.element.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  anchor: 'right',
  children: null,
  className: '',
  style: {},
};

const getPosition = (anchor, target, tooltip) => {
  const targetRect = target ? target.getBoundingClientRect() : {};
  const tooltipRect = tooltip ? tooltip.getBoundingClientRect() : {};

  const { width = 0, height = 0 } = targetRect;
  const { width: tooltipWidth = 0, height: tooltipHeight = 0 } = tooltipRect;

  switch (anchor) {
    case 'top': {
      return {
        bottom: height + TOOLTIP_OFFSET,
        left: width / 2 - tooltipWidth / 2,
      };
    }
    case 'bottom': {
      return {
        top: height + TOOLTIP_OFFSET,
        left: width / 2 - tooltipWidth / 2,
      };
    }
    case 'left': {
      return {
        right: width + TOOLTIP_OFFSET,
        top: height / 2 - tooltipHeight / 2,
      };
    }
    case 'right':
    default: {
      return {
        left: width + TOOLTIP_OFFSET,
        top: height / 2 - tooltipHeight / 2,
      };
    }
  }
};

const Tooltip = ({ anchor, target, children, className, style }) => {
  const ref = useRef(null);

  const position = getPosition(anchor, target, ref.current);

  return (
    <div
      className={classNames(
        'rc-tooltip',
        `rc-tooltip-position-${anchor}`,
        className,
      )}
      ref={ref}
      style={{ ...position, ...style }}
    >
      {children}
    </div>
  );
};

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
