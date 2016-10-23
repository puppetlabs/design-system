import React from 'react';
import ReactDOM from 'react-dom';
import Portal from 'react-portal';
import classnames from 'classnames';

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
  margin: 5,
};

class Popover extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: {},
    };

    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.setPosition(this.props.target);
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  setPosition(target) {
    /* eslint-disable react/no-find-dom-node */
    const el = ReactDOM.findDOMNode(target || this.wrapper);
    /* eslint-enable react/no-find-dom-node */
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

    if (this.props.width !== 'auto') {
      styles.width = this.props.width;
    }

    return (
      <div ref={ (c) => { this.wrapper = c; } }>
        <Portal isOpened closeOnOutsideClick onClose={ this.onClose }>
          <div className={ className } style={ styles }>
            { this.props.children }
          </div>
        </Portal>
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
