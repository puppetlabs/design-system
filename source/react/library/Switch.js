import React from 'react';
import classnames from 'classnames';

import Icon from './Icon';

const propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  checked: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

class Switch extends React.Component {

  static defaultProps() {
    return {
      checked: false,
    };
  }

  render() {
    const propsClassName = this.props.className;

    const className = classnames('rc-switch', {
      'rc-switch-checked': propsClassName === undefined,
      [propsClassName]: propsClassName !== undefined,
    });

    return (
      <div className={ className }>
        <input
          className="rc-switch-checkbox"
          checked={ this.props.checked }
          type="checkbox" id={ this.props.name }
          onChange={ this.props.onChange }
        />
        <label className="rc-switch-label" htmlFor={ this.props.name } >
          <span className="rc-switch-label-on"><Icon type="checkmark" /></span>
          <span className="rc-switch-label-off"><Icon type="close" /></span>
        </label>
      </div>
    );
  }
}

Switch.propTypes = propTypes;

export default Switch;
