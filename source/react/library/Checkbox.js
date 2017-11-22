import React from 'react';
import classnames from 'classnames';

import Icon from './Icon';

const propTypes = {
  name: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  checked: false,
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

    this.state = {
      checked: props.checked,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const checked = !this.state.checked;

    this.setState({ checked }, () => this.props.onChange(checked));
  }

  render() {
    const className = classnames('rc-checkbox', {
      'rc-checkbox-checked': this.state.checked,
    });

    return (
      <div className="rc-checkbox-container">
        <input
          type="checkbox"
          onChange={ this.onChange }
          checked={ this.state.checked }
          className={ className }
          value={ this.props.name }
          id={ this.props.name }
        />
        <Icon
          onClick={ this.onChange }
          type="check"
          width="18px"
          height="18px"
        />
      </div>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
