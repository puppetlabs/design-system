import React from 'react';
import Popover from '../Popover';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  target: React.PropTypes.object,
  onChange: React.PropTypes.func,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),
  hint: React.PropTypes.string,
  options: React.PropTypes.array,
  multiple: React.PropTypes.bool,
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

    if (this.props.onChange) {
      this.props.onChange(this.state.selected);
    }
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

    if (this.props.options) {
      this.props.options.forEach((o) => {
        let option = {};

        if (typeof o === 'string') {
          option.id = o;
          option.value = o;
        } else {
          option = o;
        }

        jsx.push(
          <DropdownMenuItem
            key={ option.id }
            option={ option }
            onClick={ this.onChange }
          />
        );
      });
    }

    return <ul>{ jsx }</ul>;
  }

  render() {
    const options = this.renderOptions();
    const hint = this.renderHint();

    return (
      <Popover
        className="rc-dropdown-menu"
        target={ this.props.target }
      >
        { hint }
        { options }
      </Popover>
    );
  }
}

DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
