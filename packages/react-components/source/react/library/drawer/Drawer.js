import React, { useState } from 'react';
import classnames from 'classnames';
import { bool, string, element, node, oneOf } from 'prop-types';
import Button from '../button';

const propTypes = {
  /** Control whether the body content is open or closed with the open boolean prop. */
  open: bool,
  /** Button text used when the drawer is toggled open. */
  buttonTextOpen: string,
  /** Button text used when the drawer is toggled closed. */
  buttonTextClosed: string,
  /** Content that is displayed within the drawer header and is always visible */
  headerContent: element,
  /** Lets you pick between transparent and text. */
  buttonType: oneOf(['transparent', 'text']),
  children: node,
};

const defaultProps = {
  open: undefined,
  buttonTextOpen: 'Hide details',
  buttonTextClosed: 'Details',
  headerContent: undefined,
  buttonType: 'transparent',
  children: undefined,
};

function Drawer({
  open,
  buttonTextOpen,
  buttonTextClosed,
  headerContent,
  buttonType,
  children,
}) {
  const [isOpen, setIsOpen] = useState(open);

  const shouldSetIsOpen = () =>
    open === undefined ? setIsOpen(!isOpen) : setIsOpen(open);

  return (
    <div className="rc-drawer-container">
      <div
        className={classnames('rc-drawer-header', {
          'rc-drawer-header-closed': !isOpen,
        })}
      >
        <div
          className={classnames('rc-drawer-header-content-container', {
            'rc-drawer-header-content-container-open': isOpen,
          })}
        >
          <div className="rc-drawer-header-content">{headerContent}</div>
        </div>
        <div className="rc-drawer-toggle-container">
          <Button
            className="rc-drawer-toggle-button"
            type={buttonType}
            trailingIcon={isOpen ? 'chevron-double-up' : 'chevron-double-down'}
            onClick={() => shouldSetIsOpen()}
          >
            {isOpen ? buttonTextOpen : buttonTextClosed}
          </Button>
        </div>
      </div>

      {isOpen && <div className="rc-drawer-body">{children}</div>}
    </div>
  );
}

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;

export default Drawer;
