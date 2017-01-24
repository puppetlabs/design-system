import React from 'react';
import classnames from 'classnames';
import equals from 'deep-equal';
import Popover from '../Popover';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  onChange: React.PropTypes.func,
  target: React.PropTypes.object,
  width: React.PropTypes.string,
  size: React.PropTypes.string,
  required: React.PropTypes.bool,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
  ]),
  blank: React.PropTypes.string,
  hint: React.PropTypes.string,
  options: React.PropTypes.array,
  multiple: React.PropTypes.bool,
  margin: React.PropTypes.number,
};

const defaultProps = {
  width: 'auto',
};

class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

    const selected = this.getSelected();

    this.state = { selected: this.getDefaultSelected(selected) };

    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const selectedChanged = equals(this.props.selected, nextProps.selected);

    if ({}.hasOwnProperty.call(nextProps, 'selected') && selectedChanged) {
      const selected = this.getSelected();

      this.setState({ selected });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If this is a single select option menu and the selections have been updated
    // then lets force the popover to close.
    if (!this.props.multiple && prevState.selected[0] !== this.state.selected[0]) {
      this.popover.close();
    }
  }

  onClose() {
    if (this.props.onChange) {
      this.props.onChange(this.state.selected);
    }
  }

  onChange(option, selected) {
    const prevSelected = this.state.selected;
    const options = this.getOptions();
    const multiple = this.props.multiple;
    let nextSelected = [];

    options.forEach((o) => {
      const id = o.id;
      const wasSelected = prevSelected.indexOf(id) >= 0;

      if ((id === option.id && selected) || (id !== option.id && wasSelected && multiple)) {
        nextSelected.push(id);
      }
    });

    if (this.props.required && nextSelected.length === 0) {
      nextSelected = prevSelected;
    }

    this.setState({ selected: nextSelected });
  }

  getOptions() {
    return this.props.options;
  }

  getDefaultSelected(selected) {
    let nextSelected = [];

    if (this.props.required && selected.length === 0 && this.props.options.length > 0) {
      nextSelected.push(this.props.options[0].id);
    } else {
      nextSelected = selected;
    }

    return nextSelected;
  }

  getSelected() {
    let selected = this.props.selected;

    selected = Array.isArray(selected) ? selected : [selected];

    return selected;
  }

  renderHint() {
    let jsx;

    if (this.props.hint) {
      jsx = <small className="rc-dropdown-hint">{ this.props.hint }</small>;
    }

    return jsx;
  }

  renderOptions() {
    let jsx = [];
    const options = this.getOptions();

    if (this.props.options && this.props.options.length > 0) {
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

      jsx = <ul>{ jsx }</ul>;
    } else if (this.props.blank) {
      jsx = <p className="rc-dropdown-blank">{ this.props.blank }</p>;
    }

    return jsx;
  }

  render() {
    const options = this.renderOptions();
    const hint = this.renderHint();
    const className = classnames('rc-dropdown-menu', {
      'rc-dropdown-menu-multiple': this.props.multiple,
    });

    return (
      <Popover
        ref={ (c) => { this.popover = c; } }
        width={ this.props.width }
        className={ className }
        target={ this.props.target }
        onClose={ this.onClose }
        margin={ this.props.margin }
        size={ this.props.size }
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
