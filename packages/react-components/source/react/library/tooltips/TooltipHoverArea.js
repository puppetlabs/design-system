import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import Portal from '../portal/portal';

export const propTypes = {
  /** Position of tooltip relative to the activating element */
  anchor: PropTypes.oneOf(['bottom', 'right', 'left', 'top']),
  /** Optional onClick for the activating element */
  onClick: PropTypes.func,
  /** The content of the tooltip */
  tooltip: PropTypes.node,
  /** The activating element for the tooltip */
  children: PropTypes.node.isRequired,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
  /** Optional, prevents tooltip from displaying when true */
  disabled: PropTypes.bool,
  /** Show arrow on tooltip. Default is true */
  arrow: PropTypes.bool,
  /** Text alignment options for tooltip */
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  /** Position of tooltip relative to the activating element */
  position: PropTypes.oneOf(['absolute', 'fixed', 'relative']),
};

export const defaultProps = {
  anchor: 'top',
  className: '',
  style: {},
  disabled: false,
  onClick: undefined,
  arrow: true,
  position: 'fixed',
  textAlign: 'center',
  tooltip: null,
};

const TooltipHoverArea = ({
  anchor,
  children,
  className,
  tooltip,
  onClick,
  style,
  disabled,
  position,
  textAlign,
  ...popperOptions
}) => {
  // Tooltip references
  const [arrowElement, setArrowReference] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { current: tooltipId } = useRef(
    `tooltip-${Math.floor(Math.random() * 10000)}`,
  );
  const popperModifiers = [
    {
      name: 'flip',
      enabled: true,
    },
    {
      name: 'arrow',
      enabled: popperOptions.arrow,
      options: {
        element: arrowElement,
        padding: 1,
        offset: [0, 6],
      },
    },
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        rootBoundary: 'document',
        padding: 0,
      },
    },
    {
      name: 'hide',
      enabled: disabled,
    },
  ];

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: anchor,
      modifiers: popperModifiers,
      strategy: position,
    },
  );

  // only limit tooltip width when the tooltip is a string
  const maxWidth = typeof tooltip === 'string' ? '200px' : 'fit-content';

  // Manage tooltip attributes
  const showTooltip = () =>
    popperElement && popperElement.setAttribute('data-show', '');
  const hideTooltip = () =>
    popperElement && popperElement.removeAttribute('data-show');

  // Manage tooltip visibility
  const mouseIn = () => {
    // popper.js doesn't take into account layout changes, so we need to update it manually
    if (update) {
      // eslint-disable-next-line no-unused-expressions
      update();
    }
    if (!disabled) showTooltip();
  };
  const mouseOut = () => hideTooltip();

  useEffect(() => {
    if (disabled) hideTooltip();
  }, [disabled, children, referenceElement]);

  return (
    <>
      {!!children && !!tooltip && (
        <Portal>
          {/* eslint-disable-next-line */}
          <div
            id={tooltipId}
            className={classNames('rc-tooltip', className)}
            ref={setPopperElement}
            style={{ ...styles.popper, textAlign, maxWidth, ...style }}
            {...attributes.popper}
            onMouseEnter={mouseIn}
            onMouseLeave={mouseOut}
            onClick={onClick}
            role="tooltip"
          >
            {popperOptions.arrow && (
              <span
                id="rc-tooltip-arrow"
                style={styles.arrow}
                {...attributes.arrow}
                ref={setArrowReference}
              />
            )}
            {tooltip}
          </div>
        </Portal>
      )}
      <div
        ref={setReferenceElement}
        aria-describedby={tooltipId}
        className="rc-tooltip-reference"
        onMouseEnter={mouseIn}
        onFocus={mouseIn}
        onBlur={mouseOut}
        onMouseLeave={mouseOut}
      >
        {children}
      </div>
    </>
  );
};

TooltipHoverArea.propTypes = propTypes;
TooltipHoverArea.defaultProps = defaultProps;

export default TooltipHoverArea;
