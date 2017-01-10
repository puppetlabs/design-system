import React from 'react';
import classnames from 'classnames';
import debounce from 'debounce';
import PopoverContent from './PopoverContent';

const propTypes = {
  open: React.PropTypes.bool,
  position: React.PropTypes.object,
  anchor: React.PropTypes.string,
  onClose: React.PropTypes.func,
  target: React.PropTypes.object,
  children: React.PropTypes.any,
  width: React.PropTypes.string,
  size: React.PropTypes.string,
  margin: React.PropTypes.number,
  className: React.PropTypes.string,
  allowBubble: React.PropTypes.bool,
};

const defaultProps = {
  width: 'auto',
  margin: 10,
  anchor: 'bottom left',
  allowBubble: false,
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
    this.setState({ open: false });

    this.onClose();
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
    const newState = { position: {} };

    if (this.props.position) {
      newState.position.top = this.props.position.top;
      newState.position.left = this.props.position.left;
    } else {
      const el = this.elem;
      const elPosition = el.getBoundingClientRect();

      switch (this.props.anchor) {
        case 'bottom right':
          newState.position.top = elPosition.bottom + this.props.margin + window.pageYOffset;
          newState.position.right = window.innerWidth - (elPosition.right + window.pageXOffset);
          break;
        case 'bottom left': default:
          newState.position.top = elPosition.bottom + this.props.margin + window.pageYOffset;
          newState.position.left = elPosition.left + window.pageXOffset;
      }
    }

    this.setState(newState);
  }

  close() {
    this.setState({ open: false });

    this.onClose();
  }

  renderButton() {
    let jsx;

    if (this.props.target) {
      jsx = React.cloneElement(this.props.target, {
        onClick: this.onClick,
        ref: (c) => { this.button = c; },
      });
    }

    return jsx;
  }

  render() {
    const className = classnames('rc-popover', this.props.className, {
      [`rc-popover-${this.props.size}`]: this.props.size,
    });
    const styles = this.state.position;
    const button = this.renderButton();

    if (this.props.width !== 'auto') {
      styles.width = this.props.width;
    }

    return (
      <div
        style={ { display: 'inline-block' } }
        className="rc-popover-wrapper"
        ref={ (c) => { this.elem = c; } }
      >
        { button }
        <PopoverContent
          isOpened={ this.state.open }
          className={ className }
          style={ styles }
          onOutsideClick={ this.onOutsideClick }
          onClose={ this.onClose }
          allowBubble={ this.props.allowBubble }
        >
          { this.props.children }
        </PopoverContent>
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
