import React from 'react';
import classnames from 'classnames';
import MenuItem from './MenuItem';

const propTypes = {
  menuItemProps: React.PropTypes.object,
  options: React.PropTypes.array,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
  ]),
  multiple: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  menuItemProps: {},
  selected: '',
};

class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(selected) {
    this.props.onChange(selected);
  }

  render() {
    const { selected, options, multiple, menuItemProps } = this.props;
    const className = classnames('rc-menu-list', {
      'rc-menu-multiple': multiple,
    });
    const jsx = [];

    options.forEach((option) => {
      let isSelected = false;

      if (Array.isArray(selected)) {
        isSelected = selected.indexOf(option.id) >= 0;
      } else {
        isSelected = selected === option.id;
      }

      jsx.push(
        <MenuItem
          key={ option.id }
          option={ option }
          selected={ isSelected }
          onClick={ this.onChange }
          multiple={ multiple }
          onMouseDown={ this.onChange }
          { ...menuItemProps }
        />,
      );
    });

    return <ul className={ className }>{ jsx }</ul>;
  }
}

MenuList.propTypes = propTypes;
MenuList.defaultProps = defaultProps;

export default MenuList;
