import React from 'react';
import classnames from 'classnames';

import Icon from './Icon';

const propTypes = {
  label: React.PropTypes.string,
  checked: React.PropTypes.bool,
};

const defaultProps = {
  checked: false,
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
    this.setState({ checked: !this.state.checked });
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
          defaultChecked={ this.state.checked }
          className={ className }
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
