import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.object,
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

    if (this.props.onClick) {
      const value = !this.props.selected ? this.props.children : null;
      this.props.onClick(value);
    }
  }

  onRemove(e) {
    e.preventDefault();

    if (this.props.onRemove) {
      this.props.onRemove(e);
    }
  }

  render() {
    const { onRemove, onClick, selected } = this.props;
    const className = classnames('rc-tag', {
      'rc-tag-selected': selected,
      'rc-tag-selectable': onClick,
      'rc-tag-removable': onRemove,
    }, this.props.className);
    let jsx;

    if (this.props.onClick) {
      jsx = (
        <a onClick={ this.onClick } href="" className={ className }>
          { this.props.children }
        </a>
      );
    } else {
      jsx = (
        <div className={ className }>
          { this.props.children }
        </div>
      );
    }

    return jsx;
  }
}

Card.propTypes = propTypes;

export default Card;
