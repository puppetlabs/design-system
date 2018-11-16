import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  renderableElement,
  elementElevation,
} from '../../helpers/customPropTypes';

import Header from './Header';
import Section from './Section';
import ActionsMenu from './ActionsMenu';
import ActionsSearch from './ActionsSearch';

const propTypes = {
  /** Html element or react component to render */
  as: renderableElement,
  /** Main visual variant */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** Card 'elevation' visually indicated with box-shadow */
  elevation: elementElevation,
  /** Turns on selectability including hover styling */
  selectable: PropTypes.bool,
  /** Is this card currently selected */
  selected: PropTypes.bool,
  /** Optional additional className */
  className: PropTypes.string,
  /** Component children */
  children: PropTypes.node,
};

const defaultProps = {
  as: 'div',
  type: 'primary',
  elevation: 0,
  selectable: false,
  selected: false,
  className: '',
  children: null,
};

const Card = ({
  as: Element,
  type,
  elevation,
  selectable,
  selected,
  className,
  children,
  isOpened, // Need to figure out what's actually going on here with portal
  ...rest
}) => (
  <Element
    className={classNames(
      'rc-card',
      `rc-card-${type}`,
      `rc-card-elevation-${elevation}`,
      {
        'rc-card-selectable': selectable,
        'rc-card-selected': selected,
      },
      className,
    )}
    aria-selected={selected}
    {...rest}
  >
    {children}
  </Element>
);

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

Card.Header = Header;
Card.Section = Section;
Card.ActionsMenu = ActionsMenu;
Card.ActionsSearch = ActionsSearch;

export default Card;
