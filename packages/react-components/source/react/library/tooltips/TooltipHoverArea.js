import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';

import Tooltip from './Tooltip';
import FadeInAndOut from '../FadeInAndOut';

const propTypes = {
  /** Position of tooltip relative to the activating element */
  anchor: PropTypes.oneOf(['bottom', 'right', 'left', 'top']),
  /** Optional onClick for the activating element */
  onClick: PropTypes.func,
  /** The content of the tooltip */
  tooltip: PropTypes.node.isRequired,
  /** The activating element for the tooltip */
  children: PropTypes.node.isRequired,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
};

const defaultProps = {
  anchor: null,
  onClick: null,
  className: '',
  style: {},
};

/**
 * When elements inside a `TooltipHoverArea` are hovered over or focussed on, a tooltip will render next to it.
 *
 * The tooltip prop passed to `TooltipHoverArea`--the tooltip content--can be a string or an element.
 */
const TooltipHoverArea = ({
  anchor,
  children,
  className,
  onClick,
  style,
  tooltip,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerElem, setTriggerElem] = useState(null);

  function handleClick(e) {
    if (onClick) {
      // If something is going to happen on click, let's just close the tooltip.
      setIsOpen(false);

      onClick(e);
    }
  }

  function onMouseOver() {
    setIsOpen(true);
  }

  function onMouseOut() {
    setIsOpen(false);
  }

  function renderTooltip() {
    if (!triggerElem) {
      return null;
    }

    return (
      <Tooltip target={triggerElem} anchor={anchor}>
        {tooltip}
      </Tooltip>
    );
  }

  const props = {
    role: 'button',
    onClick: handleClick,
    style,
  };

  return (
    <div
      {...props}
      className={classNames('rc-tooltip-area rc-tooltip-area-hover', className)}
      onMouseEnter={onMouseOver}
      onFocus={onMouseOver}
      onMouseLeave={onMouseOut}
      onBlur={onMouseOut}
      ref={elem => {
        setTriggerElem(elem);
      }}
    >
      <FadeInAndOut in={isOpen}>{renderTooltip()}</FadeInAndOut>
      {children}
    </div>
  );
};

TooltipHoverArea.propTypes = propTypes;
TooltipHoverArea.defaultProps = defaultProps;

export default TooltipHoverArea;
