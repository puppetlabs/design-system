import React from 'react';
import Portal from 'react-portal';
import classnames from 'classnames';
import PopoverContent from './PopoverContent';

const propTypes = {
  onClose: React.PropTypes.func.isRequired,
  target: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
  ]),
  width: React.PropTypes.string,
  margin: React.PropTypes.number,
  className: React.PropTypes.string,
};

const defaultProps = {
  width: 'auto',
  margin: 10,
};

class Popover extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: {},
      open: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    this.setPosition();
  }

  onOutsideClick() {
    this.setState({ open: false });
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

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
      <div style={ { display: 'inline-block' } } ref={ (c) => { this.elem = c; } }>
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
