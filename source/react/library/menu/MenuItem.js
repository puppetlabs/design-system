import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

const propTypes = {
  onClick: React.PropTypes.func,
  selected: React.PropTypes.bool,
  option: React.PropTypes.object,
  multiple: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.onClick && !this.props.option.disabled) {
      this.props.onClick(this.props.option, !this.props.selected);
    }
  }

  renderCheckmark() {
    let jsx;

    if (this.props.selected && this.props.multiple) {
      jsx = <Icon type="checkmark" height="16px" width="16px" />;
    }

    return jsx;
  }

  render() {
    const option = this.props.option;
    const checkmark = this.renderCheckmark();
    const className = classnames('rc-dropdown-item', {
      'rc-dropdown-item-selected': this.props.selected,
      'rc-dropdown-item-disabled': this.props.option.disabled,
    });

    return (
      <li className={ className }>
        <a href={ option.id } onClick={ this.onClick }>{ checkmark }{ option.value }</a>
      </li>
    );
  }
}

MenuItem.propTypes = propTypes;

export default MenuItem;
