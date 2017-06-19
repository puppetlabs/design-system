import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  children: React.PropTypes.any,
  secondary: React.PropTypes.bool,
  className: React.PropTypes.string,
  /** Callback for detecting user remove action */
  onRemove: React.PropTypes.func,
};

const defaultProps = {
  secondary: false,
};

/**
 * `Panel` groups components together.
 *
 * @example ../../../docs/Panel.md
 */
class Panel extends React.Component {

  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(e) {
    e.preventDefault();

    if (this.props.onRemove) {
      this.props.onRemove(e);
    }
  }

  renderRemoveButton() {
    let jsx;

    if (this.props.onRemove) {
      jsx = (
        <div className="remove-corner" onClick={ this.onRemove }>
          <a href="" className="rc-panel-remove"><Icon width="11" height="11" type="close" /></a>
        </div>
      );
    }

    return jsx;
  }

  render() {
    const { children, secondary, onRemove } = this.props;
    const className = classnames('rc-panel', {
      'rc-panel-secondary': secondary,
      'rc-panel-removable': onRemove,
    }, this.props.className);

    const removeButton = this.renderRemoveButton();

    return (
      <div className={ className }>
        { removeButton }
        { children }
      </div>
    );
  }
};

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
