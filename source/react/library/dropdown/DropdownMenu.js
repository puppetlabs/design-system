import React from 'react';
import classnames from 'classnames';
import Popover from '../Popover';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  onChange: React.PropTypes.func,
  target: React.PropTypes.object,
  width: React.PropTypes.string,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
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
      selected,
    };

    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClose() {
    if (this.props.onChange) {
      this.props.onChange(this.state.selected);
    }
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

    this.setState({ selected: nextSelected });
  }

  getOptions() {
    return this.props.options;
  }

  renderHint() {
    let jsx;

    if (this.props.hint) {
      jsx = <small className="rc-dropdown-hint">{ this.props.hint }</small>;
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
        onClose={ this.onClose }
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
