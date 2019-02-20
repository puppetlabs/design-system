import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ENTER_KEY_CODE } from '../../constants';
import Icon from '../icon';
import Badge from '../badge';
import TooltipHoverArea from '../tooltips/TooltipHoverArea';

const propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  to: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  minimized: PropTypes.bool,
  active: PropTypes.bool,
  count: PropTypes.number,
  onClick: PropTypes.func,
  accordion: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  as: 'a',
  to: '',
  icon: '',
  className: '',
  minimized: false,
  active: false,
  accordion: false,
  count: null,
  onClick() {},
  children: null,
};

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onClick(e) {
    const { onClick } = this.props;

    onClick(e);
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClick(e);
    }
  }

  render() {
    const {
      title,
      icon: iconProp,
      accordion,
      className,
      minimized,
      active,
      count,
      open,
      to,
      as: Component,
    } = this.props;

    const classNames = classnames('rc-sidebar-item', className);

    let karet;
    let badge;

    if (accordion) {
      const chevron = open ? 'chevron-up' : 'chevron-down';

      karet = (
        <span className="rc-sidebar-item-karet">
          <Icon size="tiny" type={chevron} />
        </span>
      );

      if (count) {
        badge = (
          <span className="rc-sidebar-item-badge">
            <Badge type="pill" color="neutral">
              {count}
            </Badge>
          </span>
        );
      }
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
        className={linkClassNames}
        role="button"
        tabIndex={0}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        to={to}
        {...contextualProps}
      >
        {icon}
        <span className="rc-sidebar-item-title">{title}</span>
        {badge}
        {karet}
      </Component>
    );

    return <li className={classNames}>{link}</li>;
  }
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
