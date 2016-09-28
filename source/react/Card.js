import React from 'react';
import classnames from 'classnames';

const propTypes = {
  size: React.PropTypes.string,
  title: React.PropTypes.string,
  children: React.PropTypes.object,
  subtitle: React.PropTypes.string,
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
          <a href="" className="rui-card-remove fa fa-close" onClick={ this.onRemove }>Remove</a>
        </div>
      );
    }

    return jsx;
  }

  renderContent() {
    const removeButton = this.renderRemoveButton();
    const { title, subtitle, children } = this.props;

    return (
      <div className="rui-card-content">
        { removeButton }
        { children }
        <div className="rui-card-title">{ title }</div>
        <span className="rui-card-subtitle">{ subtitle }</span>
      </div>
    );
  }

  render() {
    const { size, onRemove } = this.props;
    const className = classnames('rui-card', {
      'rui-card-large': size === 'large',
      'rui-card-small': size === 'small',
      'rui-card-xs': size === 'xs',
      'rui-card-removable': onRemove,
    });
    const content = this.renderContent();
    let jsx;

    if (this.props.onClick) {
      jsx = <a onClick={ this.onClick } href="" className={ className }>{ content }</a>;
    } else {
      jsx = <div className={ className }>{ content }</div>;
    }

    return jsx;
  }
}

Card.propTypes = propTypes;

export default Card;
