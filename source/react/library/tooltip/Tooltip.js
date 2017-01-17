import React from 'react';
import classnames from 'classnames';

import TooltipHoverArea from './TooltipHoverArea';

const propTypes = {
  className: React.PropTypes.string,
  target: React.PropTypes.element,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = { position: { } };

    this.setPosition = this.setPosition.bind(this);
  }

  componentDidMount() {
    this.setPosition();
  }

  setPosition() {
    const { target } = this.props;

    if (target && this.tooltip) {
      const elPosition = target.getBoundingClientRect();
      const offsetY = window.pageYOffset;

      const newState = { position: { } };

      newState.position.top = elPosition.top + offsetY;
      newState.position.left = elPosition.right + 10;

      this.setState(newState);
    }
  }

  render() {
    const className = classnames('rc-tooltip', 'position-left');
    const { position } = this.state;

    return (
      <div className="rc-tooltip-container" style={ position } ref={ c => { this.tooltip = c; } }>
        <div className={ className }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;

export { TooltipHoverArea };
export default Tooltip;
