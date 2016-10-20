import React from 'react';
import ReactDOM from 'react-dom';
import Portal from 'react-portal';

const propTypes = {
  target: React.PropTypes.object,
  children: React.PropTypes.object,
  width: React.PropTypes.string,
};

const defaultProps = {
  width: 'auto',
};

class Popover extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: {},
    };
  }

  componentDidMount() {
    this.setPosition(this.props.target);
  }

  setPosition(target) {
    const el = ReactDOM.findDOMNode(target || this.wrapper);
    const elPosition = el.getBoundingClientRect();

    this.setState({
      position: {
        top: elPosition.bottom,
        left: elPosition.left,
      },
    });
  }

  render() {
    const cssClass = 'rc-popover';
    const styles = this.state.position;

    if (this.props.width !== 'auto') {
      styles.width = this.props.width;
    }

    return (
      <div ref={ (c) => { this.wrapper = c; } }>
        <Portal isOpened closeOnEsc closeOnOutsideClick>
          <div className={ cssClass } style={ styles }>
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
