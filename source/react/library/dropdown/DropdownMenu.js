import React from 'react';
import classnames from 'classnames';
import Popover from '../Popover';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  anchor: React.PropTypes.string,
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
  selected: [],
  width: 'auto',
};

class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(option) {
    this.props.onChange(option);

    if (!this.props.multiple) {
      this.popover.close();
    }
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
    const options = this.props.options;

    if (options && options.length) {
      options.forEach((option) => {
        jsx.push(
          <DropdownMenuItem
            key={ option.id }
            option={ option }
            selected={ this.props.selected.indexOf(option.id) >= 0 }
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
        anchor={ this.props.anchor }
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
