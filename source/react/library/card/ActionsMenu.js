import React from 'react';
import ActionMenu from '../action-menu';

const propTypes = {};

const defaultProps = {};

/**
 * The card actions menu is just an actionsMenu with some defaults set
 */
const CardActionsMenu = props => (
  <ActionMenu
    icon="kebab"
    type="transparent"
    anchor="bottom right"
    {...props}
  />
);

CardActionsMenu.propTypes = propTypes;
CardActionsMenu.defaultProps = defaultProps;

export default CardActionsMenu;
