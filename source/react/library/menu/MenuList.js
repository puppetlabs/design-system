import React from 'react';
import classnames from 'classnames';
import MenuItem from './MenuItem';

const propTypes = {
  options: React.PropTypes.array,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
  ]),
  multiple: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  size: React.PropTypes.oneOf(['small', 'tiny']),
};

const defaultProps = {
  options: [],
  selected: '',
  multiple: false,
  size: null,
  onChange: null,
};

class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(selected) {
    if (this.props.onChange) {
      this.props.onChange(selected);
    }
  }

  render() {
    const { selected, options, multiple, size } = this.props;
    const className = classnames('rc-menu-list', {
      [`rc-menu-list-${size}`]: size,
      'rc-menu-multiple': multiple,
    });

    const jsx = options.map((option) => {
      let isSelected = false;

      if (Array.isArray(selected)) {
        isSelected = selected.indexOf(option.id) >= 0;
      } else {
        isSelected = selected === option.id;
      }

      return (
        <MenuItem
          key={ option.id }
          option={ option }
          selected={ isSelected }
          onClick={ this.onChange }
          multiple={ multiple }
        />
      );
    });

    return <ul className={ className }>{ jsx }</ul>;
  }
}

MenuList.propTypes = propTypes;
MenuList.defaultProps = defaultProps;

export default MenuList;
