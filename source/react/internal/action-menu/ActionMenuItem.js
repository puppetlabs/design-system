import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { renderableElement } from '../../helpers/customPropTypes';

import Icon from '../../library/icon';

const propTypes = {
  as: renderableElement,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  focused: PropTypes.bool.isRequired,
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  as: undefined,
  icon: null,
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
const OptionMenuItem = forwardRef(
  (
    { as: Element, id, children, focused, icon, onMouseEnter, ...rest },
    ref,
  ) => {
    if (Element) {
      return (
        <li
          role="none"
          className={classNames('rc-menu-item', {
            'rc-menu-item-focused': focused,
          })}
          onMouseEnter={onMouseEnter}
        >
          <Element
            id={id}
            role="menuitem"
            className="rc-menu-item-inner"
            ref={ref}
            tabIndex={-1}
            {...rest}
          >
            {icon && <Icon className="rc-menu-item-icon" type={icon} />}
            <span className="rc-menu-item-content">{children}</span>
          </Element>
        </li>
      );
    }
    return (
      <li
        role="menuitem"
        id={id}
        className={classNames('rc-menu-item', {
          'rc-menu-item-focused': focused,
        })}
        onMouseEnter={onMouseEnter}
        ref={ref}
        {...rest}
      >
        {icon && <Icon className="rc-menu-item-icon" type={icon} />}
        <span className="rc-menu-item-content">{children}</span>
      </li>
    );
  },
);
/* eslint-enable */

OptionMenuItem.propTypes = propTypes;
OptionMenuItem.defaultProps = defaultProps;

export default OptionMenuItem;
