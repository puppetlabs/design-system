import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { elementElevation } from '../../helpers/customPropTypes';

import CardActionSelect from './CardActionSelect';
import CardAction from './CardAction';
import CardTitle from './CardTitle';

const propTypes = {
  /** Html element or react component to render */
  as: PropTypes.elementType,
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
  /** Click handler. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  onClick: PropTypes.func,
};

const defaultProps = {
  as: undefined,
  type: 'primary',
  elevation: 0,
  selectable: false,
  selected: false,
  className: '',
  children: null,
  onClick() {},
};

const assignDefaultElement = (as, selectable) =>
  as || (selectable ? 'button' : 'div');

const Card = ({
  as,
  type,
  elevation,
  selectable,
  selected,
  className,
  children,
  ...rest
}) => {
  const Element = assignDefaultElement(as, selectable);

  // Find title and actions for placement in header
  const childrenArray = Children.toArray(children);
  const title = childrenArray.find(
    child => child.type && child.type.name === 'CardTitle',
  );
  const actions = childrenArray.find(
    child =>
      child.type &&
      (child.type.name === 'CardAction' ||
        child.type.name === 'CardActionSelect'),
  );
  const otherChildren = childrenArray.filter(
    child =>
      child.type &&
      child.type.name !== 'CardTitle' &&
      child.type.name !== 'CardAction' &&
      child.type.name !== 'CardActionSelect',
  );

  return (
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
      aria-current={selected || null}
      {...rest}
    >
      {(title || actions) && (
        <div className="rc-card-header">
          <div>{title}</div>
          <div>{actions}</div>
        </div>
      )}
      {otherChildren}
    </Element>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

Card.ActionSelect = CardActionSelect;
Card.Action = CardAction;
Card.Title = CardTitle;

export default Card;
