import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../../library/icon/Icon';

const propTypes = {
  option: PropTypes.shape({
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.node,
  }).isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  focused: PropTypes.bool,
};

const defaultProps = {
  className: '',
  onFocus: null,
  onClick: null,
  focused: false,
  selected: false,
};

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver() {
    const { focused, onFocus } = this.props;
    if (!focused) {
      onFocus();
    }
  }

  onClick(e) {
    const { option, onClick, selected } = this.props;
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();

      if (!option.disabled) {
        onClick(option, !selected);
      }
    }
  }

  renderCheckmark() {
    const { selected } = this.props;
    let jsx;

    if (selected) {
      jsx = <Icon type="check" size="small" />;
    }

    return jsx;
  }

  renderIcon() {
    const { option } = this.props;
    let jsx;

    if (option.icon) {
      jsx = (
        <div className="rc-menu-icon">
          <Icon type={option.icon} />
        </div>
      );
    }

    return jsx;
  }

  render() {
    const { className: propsClassName, focused, option, onFocus } = this.props;
    const checkmark = this.renderCheckmark();
    const icon = this.renderIcon();
    const className = classnames('rc-menu-item', propsClassName, {
      'rc-menu-item-with-icon': icon,
      'rc-menu-item-selected': checkmark,
      'rc-menu-item-focused': focused,
      'rc-menu-item-disabled': option.disabled,
    });

    let { value } = option;

    if (typeof option.label !== 'undefined') {
      value = option.label;
    }

    return (
      <li
        className={className}
        onMouseOver={this.onMouseOver}
        onFocus={onFocus}
      >
        <a
          href={option.href || option.id}
          className="rc-menu-item-anchor"
          onClick={this.onClick}
        >
          {icon}
          <span className="rc-menu-item-text">{value}</span>
          {checkmark}
        </a>
      </li>
    );
  }
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
