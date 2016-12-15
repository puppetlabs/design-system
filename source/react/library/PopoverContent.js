import React from 'react';
import portal from './portal';

function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

const propTypes = {
  onOutsideClick: React.PropTypes.func,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.any,
};

class PopoverContent extends React.Component {

  constructor(props) {
    super(props);

    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.onOutsideClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick, true);
  }

  onOutsideClick(e) {
    if (!isNodeInRoot(e.target, this.elem) && this.props.onOutsideClick) {
      this.props.onOutsideClick(e);
      e.stopPropagation();
    }
  }

  render() {
    const { className, style } = this.props;

    return (
      <div ref={ (c) => { this.elem = c; } } className={ className } style={ style }>
        { this.props.children }
      </div>
    );
  }
}

PopoverContent.propTypes = propTypes;

export default portal(PopoverContent);
