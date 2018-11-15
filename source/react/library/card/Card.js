import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Header from './Header';
import Section from './Section';
import ActionsMenu from './ActionsMenu';
import ActionsSearch from './ActionsSearch';

const propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line
  size: PropTypes.string,
  style: PropTypes.string,
  /** Card width in px or % */
  width: PropTypes.string,
  /** Card height in px or % */
  height: PropTypes.string,
  /** Manual active state */
  selected: PropTypes.bool,
  /** Class name to apply to container element */
  className: PropTypes.string,
  /**  Function to be called when the user clicks on a card */
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
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
  onMouseEnter: null,
  onMouseLeave: null,
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
    const { onClick } = this.props;
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }
  }

  render() {
    const {
      style,
      size,
      onClick,
      width,
      height,
      selected,
      onMouseEnter,
      onMouseLeave,
      className,
      children,
    } = this.props;

    const styles = {};

    if (width) {
      styles.width = width;
    }

    if (height) {
      styles.height = height;
    }

    const props = {
      style: styles,
      className: classnames(
        'rc-card',
        {
          'rc-card-large': size === 'large',
          'rc-card-small': size === 'small',
          'rc-card-xs': size === 'xs',
          'rc-card-selected': selected,
          [`rc-card-${style}`]: style,
          'rc-card-selectable': onClick,
        },
        className,
      ),
    };

    if (onClick) {
      props.onClick = onClick;
      props.role = 'button';
    }

    if (onMouseEnter) {
      props.onMouseEnter = onMouseEnter;
    }

    if (onMouseLeave) {
      props.onMouseLeave = onMouseLeave;
    }

    return <div {...props}>{children}</div>;
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

Card.Card = Card; // This line is needed for backwards compatability. TODO: Deprecate in future releases
Card.Header = Header;
Card.Section = Section;
Card.ActionsMenu = ActionsMenu;
Card.ActionsSearch = ActionsSearch;

export default Card;
