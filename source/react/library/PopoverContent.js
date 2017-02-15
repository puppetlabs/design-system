import React from 'react';
import portal from './portal';
import togglable from './togglable';
import Button from './Button';

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
  closeButton: React.PropTypes.bool,
  style: React.PropTypes.object,
  children: React.PropTypes.any,
  hint: React.PropTypes.string,
  allowBubble: React.PropTypes.bool,
  onClose: React.PropTypes.func,
};

class PopoverContent extends React.Component {

  constructor(props) {
    super(props);

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onClose = this.onClose.bind(this);
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

      if (!this.props.allowBubble) {
        e.stopPropagation();
      }
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { className, style, hint, closeButton } = this.props;
    let hintArea;
    let close;

    if (closeButton) {
      close = (
        <Button
          transparent
          size="small"
          className="rc-popover-close"
          icon="delete"
          onClick={ this.onClose }
        />
      );
    }

    if (hint || closeButton) {
      hintArea = <small className="rc-popover-hint">{ hint }{close}</small>;
    }

    return (
      <div ref={ (c) => { this.elem = c; } } className={ className } style={ style }>
        { hintArea }
        { this.props.children }
      </div>
    );
  }
}

PopoverContent.propTypes = propTypes;

const PopoverContentWithoutPortal = togglable(PopoverContent);
export { PopoverContentWithoutPortal };
export default portal(PopoverContent);
