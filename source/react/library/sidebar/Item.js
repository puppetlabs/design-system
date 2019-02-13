import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ENTER_KEY_CODE } from 'constants';
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
  onClick: PropTypes.func,
  accordion: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  as: 'a',
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

  getSubsectionLength() {
    const { children } = this.props;
    const { children: subsection } = children.props;

    return React.Children.toArray(subsection).length;
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
      as: Component,
    } = this.props;

    const classNames = classnames('rc-sidebar-item', className, {
      'rc-sidebar-item-selected': active,
    });

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

    const link = (
      <Component
        className="rc-sidebar-item-link"
        role="button"
        tabIndex={0}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
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
