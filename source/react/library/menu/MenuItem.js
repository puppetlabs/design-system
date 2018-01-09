import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

const propTypes = {
  option: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  selected: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

const defaultProps = {
  iconPosition: 'right',
  onClick: () => {},
  selected: false,
  disabled: false,
};

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (!this.props.option.disabled) {
      this.props.onClick(this.props.option, !this.props.selected);
    }
  }

  renderCheckmark() {
    let jsx;

    if (this.props.selected) {
      jsx = <Icon type="check" height="12px" width="12px" />;
    }

    return jsx;
  }

  renderIcon() {
    let jsx;

    if (this.props.option.icon) {
      jsx = <Icon type={ this.props.option.icon } height="16px" width="16px" />;
    }

    return jsx;
  }

  render() {
    const option = this.props.option;
    const checkmark = this.renderCheckmark();
    const icon = this.renderIcon();
    const className = classnames('rc-menu-item', this.props.className, {
      'rc-menu-item-with-icon': icon,
      'rc-menu-item-selected': checkmark,
      'rc-menu-item-disabled': this.props.option.disabled,
    });

    let value = option.value;

    if (typeof option.label !== 'undefined') {
      value = option.label;
    }

    return (
      <li className={ className }>
        <a href={ option.id } className="rc-menu-item-anchor" onClick={ this.onClick }>
          { icon }
          <span className="rc-menu-item-text">
            { value }
          </span>
          { checkmark }
        </a>
      </li>
    );
  }
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
