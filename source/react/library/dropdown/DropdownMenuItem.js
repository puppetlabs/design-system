import React from 'react';
import classnames from 'classnames';

const propTypes = {
  onClick: React.PropTypes.func,
  selected: React.PropTypes.bool,
  option: React.PropTypes.object,
};

class DropdownMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(this.props.option, !this.props.selected);
    }
  }

  render() {
    const option = this.props.option;
    const className = classnames('rc-dropdown-menu-item', {
      'rc-dropdown-menu-item-selected': this.props.selected,
    });

    return (
      <li className={ className }>
        <a href={ option.id } onClick={ this.onClick }>{ option.value }</a>
      </li>
    );
  }
}

DropdownMenuItem.propTypes = propTypes;

export default DropdownMenuItem;
