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
  position: PropTypes.shapeOf({}),
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
  target: PropTypes.element,
  children: PropTypes.node,
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
  dark: false,
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
    const { position, open } = this.state;

    if (
      open !== nextState.open ||
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
    const { disableOutsideClick } = this.props;

    if (!disableOutsideClick && !isNodeInRoot(e.target, this.elem)) {
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
    const { open } = this.state;
    const { onOpen } = this.props;

    if (open && onOpen) {
      onOpen();
    }
  }

  onClose() {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  setPosition(state = this.state) {
    const newState = { position: {} };
    const bodyWidth = document.body.clientWidth;
    const {
      position,
      disablePortal,
      inheritTargetWidth,
      anchor,
      margin,
    } = this.props;

    // If the popopver isn't open then early out as positioning doesn't matter
    if (!state.open) {
      return;
    }

    if (Object.keys(position).length > 0) {
      newState.position = position;
    } else if (this.elem) {
      const el = this.elem;
      const elPosition = el.getBoundingClientRect();
      let bottom;
      let top;
      let right;
      let left;

      if (disablePortal) {
        bottom = elPosition.height;
        left = 0;
        right = 0;
      } else {
        bottom = elPosition.bottom + window.pageYOffset;
        left = elPosition.left + window.pageXOffset;
        right = bodyWidth - (elPosition.right + window.pageXOffset);
        top = elPosition.top + window.pageYOffset;
      }

      if (inheritTargetWidth) {
        newState.width = elPosition.width;
      }

      switch (anchor) {
        case 'bottom right':
          newState.position.top = bottom + margin;
          newState.position.right = right;
          break;
        case 'right top':
          newState.position.top = top;
          newState.position.left = left + elPosition.width + margin;
          break;
        case 'left top':
          newState.position.top = top;
          newState.position.right = bodyWidth - left + margin;
          break;
        case 'bottom left':
        default:
          newState.position.top = bottom + margin;
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
    const { target, openEvent } = this.props;
    const { open } = this.state;
    let jsx;

    if (target) {
      const className = classnames(target.props.className, {
        'rc-popover-target-open': open,
      });

      jsx = React.cloneElement(target, {
        [openEvent]: this.onClick,
        ref: c => {
          this.button = c;
        },
        className,
      });
    }

    return jsx;
  }

  render() {
    const {
      wrapperClassName,
      disablePortal,
      anchor,
      className,
      size,
      menu,
      dark,
      padding,
      border,
      hint,
      closeButton,
      allowBubble,
      children,
    } = this.props;
    const { open, position, width } = this.state;
    const wrapperClassNames = classnames(
      'rc-popover-wrapper',
      wrapperClassName,
      {
        'rc-popover-wrapper-open': open,
        'rc-popover-wrapper-relative': disablePortal,
      },
    );

    const anchorForClass = anchor.replace(' ', '-');
    const classNames = classnames('rc-popover', className, {
      [`rc-popover-${size}`]: size,
      'rc-popover-no-portal': disablePortal,
      'rc-popover-menu': menu,
      'rc-popover-dark': dark,
      'rc-popover-no-padding': !padding || menu,
      'rc-popover-no-border': !border || menu,
      [`rc-popover-${anchorForClass}`]: anchorForClass,
    });

    const styles = clone(position);
    const button = this.renderButton();

    if (width !== 'auto') {
      styles.width = width;
    }

    const component = disablePortal
      ? PopoverContentWithoutPortal
      : PopoverContent;

    const popoverContent = React.createElement(
      component,
      {
        isOpened: open,
        className: classNames,
        hint,
        style: styles,
        closeButton,
        onOutsideClick: this.onOutsideClick,
        onClose: this.close,
        allowBubble,
        dark,
        menu,
      },
      children,
    );

    return (
      <div
        className={wrapperClassNames}
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
