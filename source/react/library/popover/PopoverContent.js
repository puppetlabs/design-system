import PropTypes from 'prop-types';
import React from 'react';

import { isNodeInRoot } from '../../helpers/statics';

import portal from '../portal';
import togglable from '../togglable';
import Menu from '../../internal/menu/Menu';
import Button from '../buttons/Button';

const propTypes = {
  onOutsideClick: PropTypes.func,
  dark: PropTypes.bool,
  menu: PropTypes.bool,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  style: PropTypes.shape({}),
  title: PropTypes.string,
  allowBubble: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  isOpened: PropTypes.bool,
};

const defaultProps = {
  title: '',
  onOutsideClick: null,
  dark: false,
  menu: false,
  className: '',
  closeButton: false,
  style: null,
  allowBubble: false,
  onClose: null,
  children: null,
  isOpened: false,
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
    const { onOutsideClick, isOpened, allowBubble } = this.props;

    if (!isNodeInRoot(e.target, this.elem) && onOutsideClick && isOpened) {
      onOutsideClick(e);

      if (!allowBubble) {
        e.stopPropagation();
      }
    }
  }

  onClose() {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  renderHeader() {
    const { title, closeButton, menu } = this.props;
    let close;
    let jsx;

    if (menu) {
      if (title || closeButton) {
        jsx = (
          <Menu.Header
            title={title}
            onClose={closeButton ? this.onClose : null}
          />
        );
      }
    } else {
      if (closeButton) {
        close = (
          <Button
            type="transparent"
            className="rc-popover-close"
            icon="delete"
            onClick={this.onClose}
          />
        );
      }

      if (title || closeButton) {
        jsx = (
          <div className="rc-popover-header">
            <small className="rc-popover-hint">{title}</small>
            {close}
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
        <Menu dark={dark}>
          {header}
          {children}
        </Menu>
      );
    } else {
      content = (
        <div>
          {header}
          {children}
        </div>
      );
    }

    return (
      <div
        ref={c => {
          this.elem = c;
        }}
        className={className}
        style={style}
      >
        {content}
      </div>
    );
  }
}

PopoverContent.propTypes = propTypes;
PopoverContent.defaultProps = defaultProps;

const PopoverContentWithoutPortal = togglable(PopoverContent);
export { PopoverContentWithoutPortal };

export default portal(PopoverContent);
