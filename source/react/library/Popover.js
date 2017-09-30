import React from 'react';
import classnames from 'classnames';
import debounce from 'debounce';
import PopoverContent, { PopoverContentWithoutPortal } from './PopoverContent';

const propTypes = {
  open: React.PropTypes.bool,
  menu: React.PropTypes.bool,
  position: React.PropTypes.object,
  padding: React.PropTypes.bool,
  closeButton: React.PropTypes.bool,
  anchor: React.PropTypes.string,
  onClose: React.PropTypes.func,
  target: React.PropTypes.object,
  children: React.PropTypes.any,
  width: React.PropTypes.string,
  size: React.PropTypes.string,
  hint: React.PropTypes.string,
  margin: React.PropTypes.number,
  className: React.PropTypes.string,
  allowBubble: React.PropTypes.bool,
  disablePortal: React.PropTypes.bool,
  disableOutsideClick: React.PropTypes.bool,
};

const defaultProps = {
  width: 'auto',
  margin: 10,
  padding: true,
  anchor: 'bottom left',
  allowBubble: false,
  disableOutsideClick: false,
};

class Popover extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: {},
      open: props.open || false,
    };

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.close = this.close.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 250);
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.setPosition = this.setPosition.bind(this);
  }

  componentDidMount() {
    this.setPosition();

    window.addEventListener('resize', this.onResize);
  }

  componentWillReceiveProps(props) {
    const newState = {};

    if (typeof props.open !== 'undefined' && (props.open !== this.state.open)) {
      newState.open = props.open;
    }

    if (props.position) {
      newState.position = props.position;
    }

    if (newState) {
      this.setState(newState);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const position = this.state.position;

    if (
      this.state.open !== nextState.open ||
      (nextState.position.top !== position.top || nextState.position.left !== position.left)
    ) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.setPosition();
  }

  onOutsideClick() {
    if (!this.props.disableOutsideClick) {
      this.setState({ open: false });

      this.onClose();
    }
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ open: !this.state.open });
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  setPosition() {
    const newState = { position: { } };

    if (this.props.position) {
      newState.position = this.props.position;
    } else if (this.elem) {
      const el = this.elem;
      const elPosition = el.getBoundingClientRect();
      let bottom;
      let right;
      let left;

      if (!this.props.disablePortal) {
        bottom = elPosition.bottom + window.pageYOffset;
        left = elPosition.left + window.pageXOffset;
        right = document.body.clientWidth - (elPosition.right + window.pageXOffset);
      } else {
        bottom = elPosition.height;
        left = 0;
        right = 0;
      }

      switch (this.props.anchor) {
        case 'bottom right':
          newState.position.top = bottom + this.props.margin;
          newState.position.right = right;
          break;
        case 'bottom left': default:
          newState.position.top = bottom + this.props.margin;
          newState.position.left = left;
      }
    }

    this.setState(newState);
  }

  close() {
    this.setState({ open: false });

    this.onClose();
  }

  renderButton() {
    const target = this.props.target;
    let jsx;

    if (target) {
      const className = classnames(target.props.className, {
        'rc-popover-target-open': this.state.open,
      });

      jsx = React.cloneElement(target, {
        onClick: this.onClick,
        ref: (c) => { this.button = c; },
        className,
      });
    }

    return jsx;
  }

  render() {
    const wrapperClassName = classnames('rc-popover-wrapper', {
      'rc-popover-wrapper-open': this.state.open,
      'rc-popover-wrapper-relative': this.props.disablePortal,
    });
    const className = classnames('rc-popover', this.props.className, {
      [`rc-popover-${this.props.size}`]: this.props.size,
      'rc-popover-no-padding': !this.props.padding || this.props.menu,
    });
    const styles = this.state.position;
    const button = this.renderButton();

    if (this.props.width !== 'auto') {
      styles.width = this.props.width;
    }

    const component = this.props.disablePortal ? PopoverContentWithoutPortal : PopoverContent;

    const popoverContent = React.createElement(component, {
      isOpened: this.state.open,
      className,
      hint: this.props.hint,
      style: styles,
      closeButton: this.props.closeButton,
      onOutsideClick: this.onOutsideClick,
      onClose: this.close,
      allowBubble: this.props.allowBubble,
      children: this.props.children,
      menu: this.props.menu,
    });

    return (
      <div
        className={ wrapperClassName }
        ref={ (c) => { this.elem = c; } }
      >
        { button }
        { popoverContent }
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
