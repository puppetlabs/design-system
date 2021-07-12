import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../button';
import Icon from '../icon';

import getTabId from './getTabId';
import getPanelId from './getPanelId';

const propTypes = {
  /** Optional additional className */
  className: PropTypes.string,
  /** Internally managed active state */
  active: PropTypes.bool,
  /** HTML element to render tab button as */
  as: PropTypes.elementType,
  /** The name of an icon to render before title */
  icon: PropTypes.string,
  /** For ease of reference in controlled-mode, a custom unique id can be provided. By default the tab index will be used */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Internally managed onClick for Tab button. Callback to parent */
  onKeyDown: PropTypes.func,
  /** Internally managed onClick for Tab button. Callback to parent */
  onClick: PropTypes.func,
  /** ID of the parent tabs element */
  parentId: PropTypes.string,
  /** Visible tab label */
  title: PropTypes.node,
  /** Controls the background color of active tab and panel */
  type: PropTypes.oneOf(['primary', 'secondary']),
};

const defaultProps = {
  className: '',
  active: false,
  as: 'button',
  icon: null,
  id: null,
  parentId: null,
  onKeyDown() {},
  onClick() {},
  title: '',
  type: 'primary',
};

const Tab = forwardRef(
  (
    {
      className,
      active,
      as,
      icon,
      id,
      onClick,
      parentId,
      title,
      type,
      ...rest
    },
    ref,
  ) => (
    <Button
      id={getTabId(parentId, id)}
      as={as}
      type="secondary"
      role="tab"
      aria-selected={!!active}
      aria-controls={getPanelId(parentId, id)}
      onClick={() => onClick(id)}
      tabIndex={active ? 0 : -1}
      className={classNames('rc-tabs-button', className, {
        'rc-tabs-button-active': active,
        'rc-tabs-tab-secondary': type === 'secondary',
      })}
      ref={ref}
      {...rest}
    >
      {icon && <Icon className="rc-tabs-button-icon" type={icon} />}
      {title}
    </Button>
  ),
);

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;
Tab.displayName = 'Tab';

export default Tab;
