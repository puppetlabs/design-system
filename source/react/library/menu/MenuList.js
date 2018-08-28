import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import MenuItem from './MenuItem';

const propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium']),
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
  options: PropTypes.arrayOf(PropTypes.object),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
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
    const { focusedId } = this.state;
    if (newProps.focused !== focusedId) {
      this.setState({ focusedId: newProps.focused });
    }
  }

  onMouseOut() {
    const { focusedId } = this.state;
    const { onFocus } = this.props;
    if (focusedId) {
      this.setState({ focusedId: null }, () => {
        onFocus(null);
      });
    }
  }

  onFocus(focusedId) {
    const { onFocus } = this.props;
    return () => {
      this.setState({ focusedId }, () => {
        onFocus(focusedId);
      });
    };
  }

  onChange(selected) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(selected);
    }
  }

  render() {
    const { focusedId } = this.state;
    const { multiple, selected, options, size } = this.props;
    const className = classnames('rc-menu-list', {
      [`rc-menu-list-${size}`]: size,
      'rc-menu-multiple': multiple,
    });

    const jsx = options.map(option => {
      let isSelected = false;

      if (Array.isArray(selected)) {
        isSelected = selected.indexOf(option.id) >= 0;
      } else {
        isSelected = selected === option.id;
      }

      return (
        <MenuItem
          focused={focusedId === option.id}
          onFocus={this.onFocus(option.id)}
          key={option.id}
          option={option}
          className={option.className}
          selected={isSelected}
          onClick={this.onChange}
          multiple={multiple}
        />
      );
    });

    return (
      <ul
        ref={c => {
          this.list = c;
        }}
        onMouseLeave={this.onMouseOut}
        className={className}
      >
        {jsx}
      </ul>
    );
  }
}

MenuList.propTypes = propTypes;
MenuList.defaultProps = defaultProps;

export default MenuList;
