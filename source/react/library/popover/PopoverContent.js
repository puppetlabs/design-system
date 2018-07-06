import PropTypes from 'prop-types';
import React from 'react';

import { isNodeInRoot } from '../../helpers/statics';

import portal from '../portal';
import togglable from '../togglable';
import Menu from '../menu/Menu';
import Button from '../buttons/Button';

const propTypes = {
  onOutsideClick: PropTypes.func,
  dark: PropTypes.bool,
  menu: PropTypes.bool,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  style: PropTypes.object,
  hint: PropTypes.string,
  allowBubble: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any,
};

const defaultProps = {
  onOutsideClick: null,
  dark: false,
  menu: false,
  className: '',
  closeButton: false,
  style: null,
  allowBubble: false,
  onClose: null,
  children: null,
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
    let onClose;
    let close;
    let jsx;

    if (this.props.menu) {
      if (closeButton) {
        onClose = this.onClose;
      }

      if (hint || closeButton) {
        jsx = (
          <Menu.Header title={ hint } onClose={ onClose } />
        );
      }
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
            { close }
          </div>
        );
      }
    }

    return jsx;
  }

  render() {
    const { children, menu, dark, className, style } = this.props;
    const header = this.renderHeader();
    let content;

    if (menu) {
      content = (
        <Menu dark={ dark }>{ header }{ children }</Menu>
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
PopoverContent.defaultProps = defaultProps;

const PopoverContentWithoutPortal = togglable(PopoverContent);
export { PopoverContentWithoutPortal };
export default portal(PopoverContent);
