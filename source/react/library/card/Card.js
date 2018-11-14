import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  renderableElement,
  elementElevation,
} from '../../helpers/commonPropTypes';

import Header from './Header';
import Section from './Section';
import ActionsMenu from './ActionsMenu';
import ActionsSearch from './ActionsSearch';

const propTypes = {
  as: renderableElement,
  type: PropTypes.oneOf(['primary', 'secondary']),
  elevation: elementElevation,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  className: PropTypes.string,
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
