import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../../library/icon';
import Text from '../../library/text';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  focused: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  /** Optional: choose an icon */
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  /** Or pass in your own svg... */
  svg: PropTypes.element,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  /** Optional: Causes the text of option items to be strong and include the description  */
  isDescriptionMenu: PropTypes.bool,
  /** Optional: The text which is shown besides an options label */
  description: PropTypes.string,
  /** Optional: used to ensure correct styling when a menulist includes grouped data */
  isGroupedMenu: PropTypes.bool,
};

const defaultProps = {
  icon: null,
  svg: null,
  description: null,
  isDescriptionMenu: false,
  isGroupedMenu: false,
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
const OptionMenuListItem = forwardRef(
  (
    {
      id,
      children,
      focused,
      selected,
      icon,
      svg,
      description,
      onClick,
      onMouseEnter,
      isDescriptionMenu,
      isGroupedMenu,
    },
    ref,
  ) => (
    <li
      role="option"
      id={id}
      className={classNames('rc-menu-list-item', {
        'rc-menu-list-item-focused': focused,
        'rc-menu-list-item-selected': selected,
        'rc-menu-list-item-grouped': isGroupedMenu,
      })}
      aria-selected={selected}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={ref}
    >
      {icon && <Icon className="rc-menu-list-item-icon" type={icon} />}
      {svg && !icon && <Icon className="rc-menu-list-item-icon" svg={svg} />}
      {isDescriptionMenu ? (
        <div className="rc-menu-list-item-content-container">
          <Text size="small">
            <strong>{children}</strong>
          </Text>{' '}
          <span className="rc-menu-list-item-description">{description}</span>
        </div>
      ) : (
        <span className="rc-menu-list-item-content">{children}</span>
      )}
      {selected && (
        <Icon
          className="rc-menu-list-item-checkmark"
          type="check"
          size="small"
        />
      )}
    </li>
  ),
);
/* eslint-enable */

OptionMenuListItem.propTypes = propTypes;
OptionMenuListItem.defaultProps = defaultProps;

export default OptionMenuListItem;
