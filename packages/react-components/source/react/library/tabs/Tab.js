import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renderableElement } from '../../helpers/customPropTypes';

import Button from '../button';

import getTabId from './getTabId';
import getPanelId from './getPanelId';

const propTypes = {
  /** html element to render tab button as */
  as: renderableElement,
  /** Currently controls bg color of active tab & panel */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** Visible tab label  */
  title: PropTypes.node,
  /** For ease of reference in controlled-mode, a custom unique id can be provided. By default the tab index will be used  */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Id of the parent tabs element  */
  parentId: PropTypes.string,
  /** Internally managed active state  */
  active: PropTypes.bool,
  /** Internally managed onClick for Tab button. Callback to parent */
  onKeyDown: PropTypes.func,
  /** Internally managed onClick for Tab button. Callback to parent */
  onClick: PropTypes.func,
};

const defaultProps = {
  as: 'button',
  type: 'primary',
  title: '',
  id: null,
  parentId: null,
  active: false,
  onKeyDown() {},
  onClick() {},
};

const Tab = forwardRef(
  ({ as, type, title, active, onClick, id, parentId, ...rest }, ref) => (
    <Button
      id={getTabId(parentId, id)}
      as={as}
      type="secondary"
      role="tab"
      aria-selected={!!active}
      aria-controls={getPanelId(parentId, id)}
      onClick={() => onClick(id)}
      tabIndex={active ? 0 : -1}
      className={classNames('rc-tabs-button', {
        'rc-tabs-button-active': active,
        'rc-tabs-tab-secondary': type === 'secondary',
      })}
      ref={ref}
      {...rest}
    >
      {title}
    </Button>
  ),
);

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;
Tab.displayName = 'Tab';

export default Tab;
