import React from 'react';
import classnames from 'classnames';
import MenuItem from './MenuItem';

const propTypes = {
  size: React.PropTypes.oneOf(['tiny', 'small', 'medium']),
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
  ]),
  options: React.PropTypes.array,
  multiple: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
};

const defaultProps = {
  onFocus: () => {},
  multiple: false,
  onChange: null,
  options: [],
  selected: '',
  size: null,
};

class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedId: null,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.focused !== this.state.focusedId) {
      this.setState({ focusedId: newProps.focused });
    }
  }

  onMouseOut() {
    if (this.state.focusedId) {
      this.setState({ focusedId: null }, () => {
        this.props.onFocus(null);
      });
    }
  }

  onFocus(focusedId) {
    return () => {
      this.setState({ focusedId }, () => {
        this.props.onFocus(focusedId);
      });
    };
  }

  onChange(selected) {
    if (this.props.onChange) {
      this.props.onChange(selected);
    }
  }

  render() {
    const {
      multiple,
      selected,
      options,
      size,
    } = this.props;
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
          focused={ this.state.focusedId === option.id }
          onFocus={ this.onFocus(option.id) }
          key={ option.id }
          option={ option }
          className={ option.className }
          selected={ isSelected }
          onClick={ this.onChange }
          multiple={ multiple }
        />
      );
    });

    return (
      <ul
        onMouseLeave={ this.onMouseOut }
        className={ className }
      >
        { jsx }
      </ul>
    );
  }
}

MenuList.propTypes = propTypes;
MenuList.defaultProps = defaultProps;

export default MenuList;
