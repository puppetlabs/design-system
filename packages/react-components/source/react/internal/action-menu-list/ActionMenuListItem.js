import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../../library/icon';

const propTypes = {
  as: PropTypes.elementType,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  focused: PropTypes.bool.isRequired,
  /** Optional: choose an icon */
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  /** Or pass in your own svg... */
  svg: PropTypes.element,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  innerRef: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  as: undefined,
  icon: null,
  svg: null,
  innerRef() {},
  disabled: false,
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
const ActionMenuListItem = forwardRef(
  (
    {
      as: Element,
      id,
      children,
      focused,
      icon,
      svg,
      onMouseEnter,
      innerRef,
      disabled,
      ...rest
    },
    ref,
  ) => {
    if (Element) {
      return (
        <li
          role="none"
          className={classNames('rc-menu-list-item', {
            'rc-menu-list-item-focused': focused,
            'rc-menu-list-item-disabled': disabled,
          })}
          onMouseEnter={onMouseEnter}
          ref={ref}
        >
          <Element
            id={id}
            role="menuitem"
            className="rc-menu-list-item-inner"
            tabIndex={-1}
            ref={innerRef}
            disabled={disabled}
            {...rest}
          >
            {icon && <Icon className="rc-menu-list-item-icon" type={icon} />}
            {svg && !icon && (
              <Icon className="rc-menu-list-item-icon" svg={svg} />
            )}
            <span className="rc-menu-list-item-content">{children}</span>
          </Element>
        </li>
      );
    }
    return (
      <li
        role="menuitem"
        id={id}
        className={classNames('rc-menu-list-item', {
          'rc-menu-list-item-focused': focused,
          'rc-menu-list-item-disabled': disabled,
        })}
        onMouseEnter={onMouseEnter}
        ref={ref}
        {...rest}
      >
        {icon && <Icon className="rc-menu-list-item-icon" type={icon} />}
        {svg && !icon && <Icon className="rc-menu-list-item-icon" svg={svg} />}
        <span className="rc-menu-list-item-content" ref={innerRef}>
          {children}
        </span>
      </li>
    );
  },
);
/* eslint-enable */

ActionMenuListItem.propTypes = propTypes;
ActionMenuListItem.defaultProps = defaultProps;

export default ActionMenuListItem;
