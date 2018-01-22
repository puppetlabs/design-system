import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {
  option: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  selected: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  focused: React.PropTypes.bool,
};

const defaultProps = {
  iconPosition: 'right',
  onFocus: () => {},
  onClick: () => {},
  focused: false,
  selected: false,
  disabled: false,
};

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver() {
    if (!this.props.focused) {
      this.props.onFocus();
    }
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
      jsx = (
        <div className="rc-menu-icon">
          <Icon type={ this.props.option.icon } height="16px" width="16px" />
        </div>
      );
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
      'rc-menu-item-focused': this.props.focused,
      'rc-menu-item-disabled': this.props.option.disabled,
    });

    let value = option.value;

    if (typeof option.label !== 'undefined') {
      value = option.label;
    }

    return (
      <li className={ className } onMouseOver={ this.onMouseOver } >
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
