import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../icon';
import Badge from '../badge';
import TooltipHoverArea from '../tooltips/TooltipHoverArea';

const propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  minimized: PropTypes.bool,
  active: PropTypes.bool,
  count: PropTypes.number,
  accordion: PropTypes.bool,
};

const defaultProps = {
  as: 'a',
  icon: '',
  className: '',
  minimized: false,
  active: false,
  accordion: false,
  count: null,
};

const SidebarItem = props => {
  const {
    title,
    icon: iconProp,
    accordion,
    className,
    minimized,
    active,
    count,
    open,
    as: Component,
    ...rest
  } = props;

  const classNames = classnames('rc-sidebar-item', className);

  let badge;
  let karet;

  if (count) {
    badge = (
      <span className="rc-sidebar-item-badge">
        <Badge type="pill" color="neutral">
          {count}
        </Badge>
      </span>
    );
  }

  if (accordion) {
    const chevron = open ? 'chevron-up' : 'chevron-down';

    karet = (
      <span className="rc-sidebar-item-karet">
        <Icon size="tiny" type={chevron} />
      </span>
    );
  }

  let icon;

  if (iconProp) {
    icon = (
      <span className="rc-sidebar-item-icon">
        <Icon size="medium" type={iconProp} />
      </span>
    );
  }

  if (minimized) {
    icon = (
      <TooltipHoverArea tooltip={title} anchor="right">
        {icon}
      </TooltipHoverArea>
    );
  }

  const linkClassNames = classnames('rc-sidebar-item-link', {
    'rc-sidebar-item-link-selected': active,
  });

  const contextualProps = {};

  if (active) {
    contextualProps['aria-current'] = 'page';
  }

  const link = (
    <Component
      tabIndex={0}
      className={linkClassNames}
      {...contextualProps}
      {...rest}
    >
      {icon}
      <span className="rc-sidebar-item-title">{title}</span>
      {badge}
      {karet}
    </Component>
  );

  return <li className={classNames}>{link}</li>;
};

SidebarItem.propTypes = propTypes;
SidebarItem.defaultProps = defaultProps;

export default SidebarItem;
