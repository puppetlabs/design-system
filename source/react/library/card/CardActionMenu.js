import React from 'react';
import classNames from 'classnames';
import ActionMenu from '../action-menu';

const propTypes = {};

const defaultProps = {};

/**
 * The card actions menu is just an actionsMenu with some defaults set
 */
const CardActionMenu = ({ className, ...rest }) => (
  <div className={classNames('rc-card-actions', className)}>
    <ActionMenu
      icon="kebab"
      type="transparent"
      anchor="bottom right"
      {...rest}
    />
  </div>
);

CardActionMenu.propTypes = propTypes;
CardActionMenu.defaultProps = defaultProps;

export default CardActionMenu;
