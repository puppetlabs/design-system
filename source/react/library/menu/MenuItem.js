import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

const propTypes = {
  onClick: React.PropTypes.func,
  selected: React.PropTypes.bool,
  option: React.PropTypes.object.isRequired,
  disabled: React.PropTypes.bool,
};

const defaultProps = {
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

  renderIcon() {
    const option = this.props.option;
    let jsx;

    if (this.props.selected) {
      jsx = <Icon type="check" height="12px" width="12px" />;
    } else if (option.icon) {
      jsx = <Icon type={ option.icon } height="16px" width="16px" />;
    }

    return jsx;
  }

  render() {
    const option = this.props.option;
    const icon = this.renderIcon();
    const className = classnames('rc-menu-item', {
      'rc-menu-item-with-icon': icon,
      'rc-menu-item-selected': this.props.selected,
      'rc-menu-item-disabled': this.props.option.disabled,
    });

    let value = option.value;

    if (typeof option.label !== 'undefined') {
      value = option.label;
    }

    return (
      <li className={ className }>
        <a href={ option.id } className="rc-menu-item-anchor" onClick={ this.onClick }>
          { value }
          { icon }
        </a>
      </li>
    );
  }
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
