import React from 'react';
import classnames from 'classnames';

import Icon from './icon/Icon';

const propTypes = {
  name: React.PropTypes.string,
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  name: '',
  checked: false,
  disabled: false,
  onChange: () => {},
};

/**
 * `Checkbox` allows users to check and uncheck items.
 *
 * @example ../../../docs/Checkbox.md
 */

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { checked: props.checked };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const checked = !this.state.checked;

    this.setState({ checked }, () => this.props.onChange(checked));
  }

  render() {
    const className = classnames('rc-checkbox', {
      'rc-checkbox-checked': this.state.checked,
      'rc-checkbox-disabled': this.props.disabled,
    });

    return (
      <div className="rc-checkbox-container">
        <input
          type="checkbox"
          onChange={ this.onChange }
          disabled={ this.props.disabled }
          checked={ this.state.checked }
          className={ className }
          value={ this.props.name }
          id={ this.props.name }
        />
        <Icon
          onClick={ this.onChange }
          type="check"
          width="16px"
          height="16px"
        />
      </div>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
