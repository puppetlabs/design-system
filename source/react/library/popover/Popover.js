import PropTypes from 'prop-types';
import React from 'react';
import clone from 'clone';
import classnames from 'classnames';
import debounce from 'debounce';

import {
  isNodeInRoot,
  bindParentScroll,
  unbindParentScroll,
} from '../../helpers/statics';
import PopoverContent, { PopoverContentWithoutPortal } from './PopoverContent';

const propTypes = {
  open: PropTypes.bool,
  menu: PropTypes.bool,
  position: PropTypes.object,
  padding: PropTypes.bool,
  dark: PropTypes.bool,
  border: PropTypes.bool,
  closeButton: PropTypes.bool,
  anchor: PropTypes.oneOf([
    'bottom right',
    'bottom left',
    'left top',
    'right top',
  ]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  target: PropTypes.object,
  children: PropTypes.any,
  width: PropTypes.string,
  size: PropTypes.string,
  hint: PropTypes.string,
  margin: PropTypes.number,
  className: PropTypes.string,
  allowBubble: PropTypes.bool,
  disablePortal: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  inheritTargetWidth: PropTypes.bool,
  disableOutsideClick: PropTypes.bool,
  openEvent: PropTypes.string,
};

const defaultProps = {
  open: null,
  menu: false,
  position: {},
  padding: true,
  border: true,
  closeButton: false,
  anchor: 'bottom left',
  onOpen: null,
  onClose: null,
  target: null,
  width: 'auto',
  size: null,
  hint: '',
  margin: 8,
  className: '',
  openEvent: 'onClick',
  allowBubble: false,
  disablePortal: false,
  wrapperClassName: '',
  inheritTargetWidth: false,
  disableOutsideClick: false,
  children: null,
};

/**
 * `Popover` is a generalized component we use for rendering menus over other content.
 */

class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: props.position,
      open: props.open,
      width: props.width,
    };

    this.onClick = this.onClick.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.close = this.close.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 250);
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.setPosition = this.setPosition.bind(this);
  }

  componentDidMount() {
    this.setPosition();

    window.addEventListener('resize', this.onResize);

    if (this.elem) {
      bindParentScroll(this.elem, this.setPosition);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const position = this.state.position;

    if (
      this.state.open !== nextState.open ||
      (nextState.position.top !== position.top ||
        nextState.position.left !== position.left)
    ) {
      this.setPosition(nextState);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);

    if (this.elem) {
      unbindParentScroll(this.elem, this.setPosition);
    }
  }

  onResize() {
    this.setPosition();
  }

  onOutsideClick(e) {
    if (!this.props.disableOutsideClick && !isNodeInRoot(e.target, this.elem)) {
      this.setState({ open: false });
      this.onClose();
    }
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ open: true }, this.onOpen);
  }

  onOpen() {
    if (this.state.open && this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  setPosition(state = this.state) {
    const newState = { position: {} };
    const bodyWidth = document.body.clientWidth;

    // If the popopver isn't open then early out as positioning doesn't matter
    if (!state.open) {
      return;
    }

    if (Object.keys(this.props.position).length > 0) {
      newState.position = this.props.position;
    } else if (this.elem) {
      const el = this.elem;
      const elPosition = el.getBoundingClientRect();
      let bottom;
      let top;
      let right;
      let left;

      if (this.props.disablePortal) {
        bottom = elPosition.height;
        left = 0;
        right = 0;
      } else {
        bottom = elPosition.bottom + window.pageYOffset;
        left = elPosition.left + window.pageXOffset;
        right = bodyWidth - (elPosition.right + window.pageXOffset);
        top = elPosition.top + window.pageYOffset;
      }

      if (this.props.inheritTargetWidth) {
        newState.width = elPosition.width;
      }

      switch (this.props.anchor) {
        case 'bottom right':
          newState.position.top = bottom + this.props.margin;
          newState.position.right = right;
          break;
        case 'right top':
          newState.position.top = top;
          newState.position.left = left + elPosition.width + this.props.margin;
          break;
        case 'left top':
          newState.position.top = top;
          newState.position.right = bodyWidth - left + this.props.margin;
          break;
        case 'bottom left':
        default:
          newState.position.top = bottom + this.props.margin;
          newState.position.left = left;
      }
    }

    this.setState(newState);
  }

  open() {
    this.setState({ open: true }, this.onOpen);
  }

  close() {
    this.setState({ open: false }, this.onClose);
  }

  renderButton() {
    const target = this.props.target;
    let jsx;

    if (target) {
      const className = classnames(target.props.className, {
        'rc-popover-target-open': this.state.open,
      });

      jsx = React.cloneElement(target, {
        [this.props.openEvent]: this.onClick,
        ref: c => {
          this.button = c;
        },
        className,
      });
    }

    return jsx;
  }

  render() {
    const wrapperClassName = classnames(
      'rc-popover-wrapper',
      this.props.wrapperClassName,
      {
        'rc-popover-wrapper-open': this.state.open,
        'rc-popover-wrapper-relative': this.props.disablePortal,
      },
    );

    const anchorForClass = this.props.anchor.replace(' ', '-');
    const className = classnames('rc-popover', this.props.className, {
      [`rc-popover-${this.props.size}`]: this.props.size,
      'rc-popover-no-portal': this.props.disablePortal,
      'rc-popover-menu': this.props.menu,
      'rc-popover-dark': this.props.dark,
      'rc-popover-no-padding': !this.props.padding || this.props.menu,
      'rc-popover-no-border': !this.props.border || this.props.menu,
      [`rc-popover-${anchorForClass}`]: anchorForClass,
    });

    const styles = clone(this.state.position);
    const button = this.renderButton();

    if (this.state.width !== 'auto') {
      styles.width = this.state.width;
    }

    const component = this.props.disablePortal
      ? PopoverContentWithoutPortal
      : PopoverContent;

    const popoverContent = React.createElement(
      component,
      {
        isOpened: this.state.open,
        className,
        hint: this.props.hint,
        style: styles,
        closeButton: this.props.closeButton,
        onOutsideClick: this.onOutsideClick,
        onClose: this.close,
        allowBubble: this.props.allowBubble,
        dark: this.props.dark,
        menu: this.props.menu,
      },
      this.props.children,
    );

    return (
      <div
        className={wrapperClassName}
        ref={c => {
          this.elem = c;
        }}
      >
        {button}
        {popoverContent}
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
