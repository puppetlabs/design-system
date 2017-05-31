import React from 'react';
import classnames from 'classnames';

import Title from './Title';

const propTypes = {
  size: React.PropTypes.string,
  children: React.PropTypes.any,
  /** Card height in px */
  height: React.PropTypes.string,
  /** Manual active state */
  selected: React.PropTypes.bool,
  /** Class name to apply to container element */
  className: React.PropTypes.string,
  /** Callback for detecting user remove action */
  onRemove: React.PropTypes.func,
  /** Card will be wrapped in anchor tag when passed `onClick` */
  onClick: React.PropTypes.func,
};

/**
 * `Card` displays information about an object, usually as a more visual
 * alternative to a `List`.
 */
class Card extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  renderContent() {
    const children = this.props.children;

    return (
      <div className="rc-card-content">
        { children }
      </div>
    );
  }

  render() {
    const { size, onClick, height, selected } = this.props;
    const className = classnames('rc-card', {
      'rc-card-large': size === 'large',
      'rc-card-small': size === 'small',
      'rc-card-xs': size === 'xs',
      'rc-card-selected': selected,
      'rc-card-selectable': onClick,
    }, this.props.className);
    const content = this.renderContent();
    const styles = {};
    let jsx;

    if (height) {
      styles.height = height;
    }

    if (this.props.onClick) {
      jsx = (
        <a
          onClick={ this.onClick }
          href=""
          className={ className }
          style={ styles }
        >
          { content }
        </a>
      );
    } else {
      jsx = <div className={ className } style={ styles }>{ content }</div>;
    }

    return jsx;
  }
}

Card.propTypes = propTypes;

export { Title };
export default Card;
