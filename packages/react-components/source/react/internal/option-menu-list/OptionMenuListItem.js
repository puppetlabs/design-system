import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../../library/icon';

const types = {
  OPTION: 'option',
  HEADING: 'heading',
};

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  focused: PropTypes.bool,
  selected: PropTypes.bool,
  /** Optional: choose an icon */
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  /** Or pass in your own svg... */
  svg: PropTypes.element,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(types)),
};

const defaultProps = {
  icon: null,
  svg: null,
  focused: false,
  disabled: false,
  selected: false,
  onClick: null,
  onMouseEnter: null,
  type: types.OPTION,
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
      onClick,
      onMouseEnter,
      disabled,
      type,
    },
    ref,
  ) => {
    const isHeading = type === types.HEADING;
    const itemProps = {
      id,
      ref,
      onMouseEnter,
      onClick,
      role: isHeading ? 'presentation' : 'option',
    };

    if (!isHeading) {
      itemProps['aria-selected'] = selected;
    }

    return (
      <li
        {...itemProps}
        className={classNames(
          'rc-menu-list-item',
          {
            'rc-menu-list-item-disabled': disabled,
          },
          isHeading
            ? 'rc-menu-list-group-heading'
            : {
                'rc-menu-list-item-focused': focused,
                'rc-menu-list-item-selected': selected,
              },
        )}
      >
        {icon && <Icon className="rc-menu-list-item-icon" type={icon} />}
        {svg && !icon && <Icon className="rc-menu-list-item-icon" svg={svg} />}
        <span className="rc-menu-list-item-content">{children}</span>
        {!isHeading && selected && (
          <Icon
            className="rc-menu-list-item-checkmark"
            type="check"
            size="small"
          />
        )}
      </li>
    );
  },
);
/* eslint-enable */

OptionMenuListItem.propTypes = propTypes;
OptionMenuListItem.defaultProps = defaultProps;

export default OptionMenuListItem;
