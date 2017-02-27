import React from 'react';
import portal from './portal';
import togglable from './togglable';
import Menu from './menu/Menu';
import MenuHeader from './menu/MenuHeader';
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
  menu: React.PropTypes.bool,
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

  renderHeader() {
    const { hint, closeButton } = this.props;
    let close;
    let jsx;

    if (this.props.menu) {
      jsx = (
        <MenuHeader title={ hint } onClose={ closeButton && this.onClose } />
      );
    } else {
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
        jsx = (
          <div className="rc-popover-header">
            <small className="rc-popover-hint">{ hint }</small>
            {close}
          </div>
        );
      }
    }

    return jsx;
  }

  render() {
    const { children, menu, className, style } = this.props;
    const header = this.renderHeader();
    let content;

    if (menu) {
      content = (
        <Menu>{ header }{ children }</Menu>
      );
    } else {
      content = (
        <div>
          { header }
          { children }
        </div>
      );
    }

    return (
      <div ref={ (c) => { this.elem = c; } } className={ className } style={ style }>
        { content }
      </div>
    );
  }
}

PopoverContent.propTypes = propTypes;

const PopoverContentWithoutPortal = togglable(PopoverContent);
export { PopoverContentWithoutPortal };
export default portal(PopoverContent);
