import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindParentScroll, unbindParentScroll } from '../../helpers/statics';

const TOOLTIP_OFFSET = 6;

const propTypes = {
  anchor: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  target: (typeof Element === 'undefined'
    ? PropTypes.any
    : PropTypes.instanceOf(Element)
  ).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  anchor: 'top',
  children: null,
  className: '',
  style: {},
};

const getPosition = (anchor, target, tooltip) => {
  const targetRect = target ? target.getBoundingClientRect() : {};
  const tooltipRect = tooltip ? tooltip.getBoundingClientRect() : {};

  const { top, left, bottom, right, width = 0, height = 0 } = targetRect;
  const { width: tooltipWidth = 0, height: tooltipHeight = 0 } = tooltipRect;

  switch (anchor) {
    case 'top': {
      return {
        top: top - tooltipHeight - TOOLTIP_OFFSET,
        left: left + width / 2 - tooltipWidth / 2,
      };
    }
    case 'bottom': {
      return {
        top: bottom + TOOLTIP_OFFSET,
        left: left + width / 2 - tooltipWidth / 2,
      };
    }
    case 'left': {
      return {
        left: left - tooltipWidth - TOOLTIP_OFFSET,
        top: top + height / 2 - tooltipHeight / 2,
      };
    }
    case 'right':
    default: {
      return {
        left: right + TOOLTIP_OFFSET,
        top: top + height / 2 - tooltipHeight / 2,
      };
    }
  }
};

const Tooltip = ({ anchor, target, children, className, style }) => {
  const ref = useRef(null);
  const [position, setPositionState] = useState({});

  const setPosition = () =>
    setPositionState(getPosition(anchor, target, ref.current));

  useEffect(() => {
    setPosition();

    if (target) {
      bindParentScroll(target, setPosition);
      target.addEventListener('mouseenter', setPosition);
    }

    return () => {
      unbindParentScroll(target, setPosition);
      if (target) {
        target.removeEventListener('mouseenter', setPosition);
      }
    };
  }, [anchor, target, children]);

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
