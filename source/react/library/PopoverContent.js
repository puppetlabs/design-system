import React from 'react';

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
  children: React.PropTypes.array,
};

class PopoverContent extends React.Component {

  constructor(props) {
    super(props);

    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick);
  }

  onOutsideClick(e) {
    e.stopPropagation();

    if (isNodeInRoot(e.target, this.elem)) {
      return;
    }

    if (this.props.onOutsideClick) {
      this.props.onOutsideClick(e);
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

export default PopoverContent;
