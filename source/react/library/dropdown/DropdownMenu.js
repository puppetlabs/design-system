import React from 'react';
import classnames from 'classnames';
import Popover from '../Popover';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  target: React.PropTypes.object,
  onChange: React.PropTypes.func,
  width: React.PropTypes.string,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),
  hint: React.PropTypes.string,
  options: React.PropTypes.array,
  multiple: React.PropTypes.bool,
};

const defaultProps = {
  width: 'auto',
};

class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

    const selected = Array.isArray(props.selected) ? props.selected : [props.selected];

    this.state = {
      open: false,
      selected,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(option, selected) {
    const nextSelected = [];
    const prevSelected = this.state.selected;
    const options = this.getOptions();
    const multiple = this.props.multiple;

    options.forEach((o) => {
      const id = o.id;
      const wasSelected = prevSelected.indexOf(id) >= 0;

      if ((id === option.id && selected) || (id !== option.id && wasSelected && multiple)) {
        nextSelected.push(id);
      }
    });

    this.setState({ selected: nextSelected }, () => {
      if (this.props.onChange) {
        this.props.onChange(nextSelected);
      }
    });
  }

  getOptions() {
    return this.props.options.map((o) => {
      let obj;

      if (typeof o === 'string') {
        obj = { id: o, value: o };
      } else {
        obj = o;
      }

      return obj;
    });
  }

  renderHint() {
    let jsx;

    if (this.props.hint) {
      jsx = <p>{ this.props.hint }</p>;
    }

    return jsx;
  }

  renderOptions() {
    const jsx = [];
    const options = this.getOptions();

    if (this.props.options) {
      options.forEach((option) => {
        jsx.push(
          <DropdownMenuItem
            key={ option.id }
            option={ option }
            selected={ this.state.selected.indexOf(option.id) >= 0 }
            onClick={ this.onChange }
            multiple={ this.props.multiple }
          />
        );
      });
    }

    return <ul>{ jsx }</ul>;
  }

  render() {
    const options = this.renderOptions();
    const hint = this.renderHint();
    const className = classnames('rc-dropdown-menu', {
      'rc-dropdown-menu-multiple': this.props.multiple,
    });

    return (
      <Popover
        width={ this.props.width }
        className={ className }
        target={ this.props.target }
      >
        { hint }
        { options }
      </Popover>
    );
  }
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
