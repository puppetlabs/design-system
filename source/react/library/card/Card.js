import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  size: React.PropTypes.string,
  style: React.PropTypes.string,
  /** Card width in px or % */
  width: React.PropTypes.string,
  /** Card height in px or % */
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
  style: '',
  width: '',
  height: '',
  selected: false,
  className: '',
  children: null,
  onClick: null,
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

  onClick(e) {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const { style, size, onClick, width, height, selected } = this.props;
    const className = classnames('rc-card', {
      'rc-card-large': size === 'large',
      'rc-card-small': size === 'small',
      'rc-card-xs': size === 'xs',
      'rc-card-selected': selected,
      [`rc-card-${style}`]: style,
      'rc-card-selectable': onClick,
    }, this.props.className);
    const content = this.props.children;
    const styles = {};

    if (width) {
      styles.width = width;
    }

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
