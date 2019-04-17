import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../../library/icon';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  focused: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
};

const defaultProps = {
  icon: null,
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
const OptionMenuItem = ({
  id,
  children,
  focused,
  selected,
  icon,
  onClick,
  onMouseEnter,
}) => (
  <li
    role="option"
    id={id}
    className={classNames('rc-menu-item', {
      'rc-menu-item-focused': focused,
      'rc-menu-item-selected': selected,
    })}
    aria-selected={selected}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    {icon && <Icon className="rc-menu-item-icon" type={icon} />}
    <span className="rc-menu-item-content">{children}</span>
    {selected && <Icon className="rc-menu-item-checkmark" type="check" />}
  </li>
);
/* eslint-enable */

OptionMenuItem.propTypes = propTypes;
OptionMenuItem.defaultProps = defaultProps;

export default OptionMenuItem;
