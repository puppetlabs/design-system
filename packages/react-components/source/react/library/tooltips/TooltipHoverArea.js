import React, { useState, useEffect, render } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePopper, Popper } from 'react-popper';
import Portal from '../portal/portal';

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

  //Positioning options for popper.js
  position: PropTypes.oneOf(['fixed', 'absolute']),
};

export const defaultProps = {
  anchor: 'top',
  className: '',
  style: {},
  enabled: true,
  onClick: undefined,
  flip: true,
  arrow: true,
  position: 'fixed',
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
  position,
  ...popperOptions
}) => {
  // Tooltip references
  const [arrowElement, setArrowReference] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

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
        rootBoundary: 'document',
        padding: 0,
      },
    },
    {
      name: 'hide',
      enabled: !enabled,
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

  // Manage tooltip attributes
  const showTooltip = () => popperElement?.setAttribute('data-show', '');
  const hideTooltip = () => popperElement?.removeAttribute('data-show');

  // Manage tooltip visibility
  const mouseIn = () => {
    // popper.js doesn't take into account layout changes, so we need to update it manually
    update?.();
    enabled && showTooltip();
  };
  const mouseOut = () => hideTooltip();

  useEffect(() => {
    !enabled && hideTooltip();
  }, [enabled, children, referenceElement]);

  return (
    <>
      {!!children && !!tooltip && (
        <Portal>
          <div
            className={classNames('rc-tooltip', className)}
            ref={setPopperElement}
            style={{ ...styles.popper, ...style }}
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
          </div>
        </Portal>
      )}
      <div
        ref={setReferenceElement}
        className="rc-tooltip-reference"
        onMouseEnter={mouseIn}
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
