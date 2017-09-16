import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  size: React.PropTypes.string,
  /** Card height in px */
  height: React.PropTypes.string,
  /** Manual active state */
  selected: React.PropTypes.bool,
  /** Class name to apply to container element */
  className: React.PropTypes.string,
  /**  Function to be called when the user clicks on a card */
  onClick: React.PropTypes.func,
};

const defaultProps = {
  size: '',
  children: [],
  height: '',
  selected: false,
  className: '',
};

/**
 * `Card` displays information about an object, usually as a more visual
 * alternative to a `List`.
 */
class Card extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    console.log('actions: ', this.actions);
  }

  onClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  renderActions() {
    let jsx;

    if (this.props.actions) {
      jsx = (
        <div ref={ (c) => { this.actions = c; } }>
          { this.props.actions }
        </div>
      );
    }

    return jsx;
  }

  render() {
    const { size, onClick, height, selected } = this.props;
    const className = classnames('rc-card', {
      'rc-card-large': size === 'large',
      'rc-card-small': size === 'small',
      'rc-card-xs': size === 'xs',
      'rc-card-selected': selected,
      'rc-card-selectable': onClick,
    }, this.props.className);
    const content = this.props.children;
    const styles = {};

    if (height) {
      styles.height = height;
    }

    const props = {
      style: styles,
      className,
    };

    if (onClick) {
      props.onClick = onClick;
      props.role = 'button';
    }

    return <div { ...props }>{ content }</div>;
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
