import React from 'react';
import classnames from 'classnames';

import Icon from './Icon';

const propTypes = {
  onChange: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  checked: React.PropTypes.bool,
  label: React.PropTypes.bool,
};

const defaultProps = {
  checked: false,
  label: true,
};

class Switch extends React.Component {
  renderLabel() {
    let jsx;

    if (this.props.label) {
      jsx = (
        <label className="rc-switch-label" htmlFor={ this.props.name } >
          <span className="rc-switch-label-on"><Icon type="checkmark" /></span>
          <span className="rc-switch-label-off"><Icon type="close" /></span>
        </label>
      );
    } else {
      jsx = <label className="rc-switch-label" htmlFor={ this.props.name } />
    }

    return jsx;
  }

  render() {
    const propsClassName = this.props.className;
    const label = this.renderLabel();

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
        { label }
      </div>
    );
  }
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
