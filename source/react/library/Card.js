import React from 'react';
import classnames from 'classnames';

const propTypes = {
  size: React.PropTypes.string,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  children: React.PropTypes.object,
  height: React.PropTypes.string,
  selected: React.PropTypes.bool,
  className: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onClick: React.PropTypes.func,
};

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
          <a href="" className="rc-card-remove fa fa-close" onClick={ this.onRemove }>Remove</a>
        </div>
      );
    }

    return jsx;
  }

  renderContent() {
    const removeButton = this.renderRemoveButton();
    const { title, subtitle, children } = this.props;

    return (
      <div className="rc-card-content">
        { removeButton }
        { children }
        <div className="rc-card-title">{ title }</div>
        <span className="rc-card-subtitle">{ subtitle }</span>
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
