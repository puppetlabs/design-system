import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  selected: React.PropTypes.bool,
  className: React.PropTypes.string,
  size: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onClick: React.PropTypes.func,
};

class Tag extends React.Component {

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
    const { onRemove, onClick, selected, size } = this.props;
    const className = classnames('rc-tag', {
      'rc-tag-selected': selected,
      'rc-tag-selectable': onClick,
      'rc-tag-removable': onRemove,
      [`rc-tag-${size}`]: size,
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

Tag.propTypes = propTypes;

export default Tag;
