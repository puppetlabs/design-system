import React from 'react';
import Portal from 'react-portal';
import classnames from 'classnames';
import debounce from 'debounce';
import PopoverContent from './PopoverContent';

const propTypes = {
  open: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  target: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.array,
    React.PropTypes.string,
  ]),
  width: React.PropTypes.string,
  margin: React.PropTypes.number,
  className: React.PropTypes.string,
};

const defaultProps = {
  open: false,
  width: 'auto',
  margin: 10,
};

class Popover extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: {},
      open: props.open,
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

  componentWillUpdate(nextProps, nextState) {
    if (this.state.open !== nextState.open) {
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
    const el = this.elem;
    const elPosition = el.getBoundingClientRect();

    this.setState({
      position: {
        top: elPosition.bottom + this.props.margin,
        left: elPosition.left,
      },
    });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const className = classnames('rc-popover', this.props.className);
    const styles = this.state.position;
    const button = React.cloneElement(this.props.target, {
      onClick: this.onClick,
      ref: (c) => { this.button = c; },
    });

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
        <Portal isOpened={ this.state.open } onClose={ this.onClose }>
          <PopoverContent
            className={ className }
            style={ styles }
            onOutsideClick={ this.onOutsideClick }
          >
            { this.props.children }
          </PopoverContent>
        </Portal>
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
