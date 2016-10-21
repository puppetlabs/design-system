import React from 'react';
import Popover from '../Popover';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  target: React.PropTypes.object,
  hint: React.PropTypes.string,
  options: React.PropTypes.array,
  multiple: React.PropTypes.bool,
};

class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selected: null,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(val) {
    console.log(val);
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
        className="rc-dropdown"
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
