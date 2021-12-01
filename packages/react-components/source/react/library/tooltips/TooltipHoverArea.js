import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePopper } from 'react-popper';

export const propTypes = {
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
  /** Optional, prevents tooltip from displaying when false */
  enabled: PropTypes.bool,
  //Add popper flip option described in https://popper.js.org/popper-documentation.html#modifiers
  flip: PropTypes.bool,
  //Add popper arrow option described in https://popper.js.org/popper-documentation.html#modifiers
  arrow: PropTypes.bool,
};

export const defaultProps = {
  anchor: 'top',
  className: '',
  style: {},
  enabled: true,
  onClick: undefined,
  flip: true,
  arrow: true,
};

/**
 *
 * When elements inside a `Tooltip` are hovered over or focussed on, a tooltip will render next to it.
 *
 * @prop {string | Element } tooltip element or string to be rendered in the tooltip.
 *
 */

const TooltipHoverArea = ({
  anchor,
  children,
  className,
  tooltip,
  onClick,
  style,
  enabled,
  ...popperOptions
}) => {
  // Tooltip references
  const [arrowElement, setArrowReference] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  // Create delay timer for tooltip
  const [timer, setTimer] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const popperModifiers = [
    {
      name: 'flip',
      enabled: popperOptions.flip,
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
        padding: 0,
      },
    },
    {
      name: 'hide',
      enabled: !enabled,
    },
  ];

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: anchor,
    modifiers: popperModifiers,
  });

  // Manage tooltip attributes
  const showTooltip = () => popperElement?.setAttribute('data-show', '');
  const hideTooltip = () => popperElement?.removeAttribute('data-show');

  // Manage tooltip visibility
  const mouseIn = () => enabled && setIsActive(true);
  const mouseOut = () => setIsActive(false);

  const handleMouseEvent = event =>
    event === 'mouseover' ? mouseIn : mouseOut;

  const addListeners = () =>
    ['mouseover', 'mouseout'].forEach(event => {
      referenceElement?.addEventListener?.(
        event,
        handleMouseEvent(event),
        true,
      );
    });

  const removeListeners = () =>
    ['mouseover', 'mouseout'].forEach((event, i) => {
      referenceElement?.removeEventListener?.(
        event,
        handleMouseEvent(event),
        true,
      );
    });

  // Add listeners on mount
  useEffect(() => {
    addListeners();
    return () => removeListeners();
  }, [referenceElement, popperElement]);

  // Handle tooltip visibility
  useEffect(() => {
    console.log('is rendering tooltip');
    clearInterval(timer);
    if (!isActive) {
      let interval = setInterval(() => hideTooltip(), 1000);
      setTimer(interval);
    } else if (enabled) {
      showTooltip();
    }
    return () => {
      clearInterval(timer);
      hideTooltip();
    };
  }, [isActive, enabled]);

  const root = document.getElementsByClassName('app')[0];

  return (
    <>
      {!!children &&
        !!tooltip &&
        createPortal(
          <div
            className={classNames('rc-tooltip', className)}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            onMouseEnter={mouseIn}
            onMouseLeave={mouseOut}
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
          </div>,
          root,
        )}
      {/* 
       <span ref={setReferenceElement} className="rc-tooltip-reference">
        {children}
      </span> */}
      {React.cloneElement(children, {
        // Preserves pre-existing refs
        ref: node => {
          setReferenceElement(node);
          const { ref } = children;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        },
      })}
    </>
  );
};

TooltipHoverArea.propTypes = propTypes;
TooltipHoverArea.defaultProps = defaultProps;

export default TooltipHoverArea;
