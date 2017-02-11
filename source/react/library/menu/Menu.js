import React from 'react';
import MenuItem from './MenuItem';

const propTypes = {
  options: React.PropTypes.array,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
  ]),
  multiple: React.PropTypes.bool,
  required: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(selected) {
    this.props.onChange(selected);
  }

  render() {
    const { selected, options } = this.props;
    const jsx = [];

    options.forEach((option) => {
      jsx.push(
        <MenuItem
          key={ option.id }
          option={ option }
          selected={ selected.indexOf(option.id) >= 0 }
          onClick={ this.onChange }
          multiple={ this.props.multiple }
        />
      );
    });

    return <ul className="rc-menu">{ jsx }</ul>;
  }
}

Menu.propTypes = propTypes;

export default Menu;
