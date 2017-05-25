import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  size: React.PropTypes.string,
  /** Primary title of the card */
  title: React.PropTypes.string,
  /** Secondary title of the card */
  subtitle: React.PropTypes.string,
  children: React.PropTypes.object,
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
 *
 * @example ../../../docs/Card.md
 */
class Card extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    this.props.onClick(e);
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
        <div className="remove-corner">
          <a href="" className="rc-card-remove" onClick={ this.onRemove }><Icon width="10" height="10" type="close" /></a>
        </div>
      );
    }

    return jsx;
  }

  renderTitle() {
    const title = this.props.title;
    let jsx;

    if (title) {
      jsx = <div className="rc-card-title">{ title }</div>;
    }

    return jsx;
  }

  renderSubtitle() {
    const subtitle = this.props.subtitle;
    let jsx;

    if (subtitle) {
      jsx = <span className="rc-card-subtitle">{ subtitle }</span>;
    }

    return jsx;
  }

  renderContent() {
    const removeButton = this.renderRemoveButton();
    const children = this.props.children;
    const title = this.renderTitle();
    const subtitle = this.renderSubtitle();

    return (
      <div className="rc-card-content">
        { removeButton }
        { children }
        { title }
        { subtitle }
      </div>
    );
  }

  render() {
    const { size, onRemove, onClick, height, selected } = this.props;
    const className = classnames('rc-card', {
      'rc-card-large': size === 'large',
      'rc-card-small': size === 'small',
      'rc-card-xs': size === 'xs',
      'rc-card-selected': selected,
      'rc-card-selectable': onClick,
      'rc-card-removable': onRemove,
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

export default Card;
