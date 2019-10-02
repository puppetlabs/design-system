import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../icon';
import Badge from '../badge';
import TooltipHoverArea from '../tooltips/TooltipHoverArea';

const propTypes = {
  as: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  minimized: PropTypes.bool,
  active: PropTypes.bool,
  count: PropTypes.number,
};

const defaultProps = {
  as: 'a',
  icon: '',
  className: '',
  minimized: false,
  active: false,
  count: null,
};

const SidebarItem = props => {
  const {
    title,
    icon: iconProp,
    className,
    minimized,
    active,
    count,
    as: Component,
    ...rest
  } = props;

  const classNames = classnames('rc-sidebar-item', className);

  let badge;

  if (count) {
    badge = (
      <span className="rc-sidebar-item-badge">
        <Badge pill type="neutral">
          {count}
        </Badge>
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
    </Component>
  );

  return <li className={classNames}>{link}</li>;
};

SidebarItem.propTypes = propTypes;
SidebarItem.defaultProps = defaultProps;

export default SidebarItem;
