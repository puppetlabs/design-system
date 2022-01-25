import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
import Heading from '../heading';
import Portal from '../portal';

const propTypes = {
  border: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  closeButtonProps: PropTypes.shape({}),
  /** Icon to be rendered for the close button  */
  closeButtonIcon: PropTypes.string,
  contentClassName: PropTypes.string,
  /** Boolean value used to conditionally render the close button  */
  hideCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.node,
  /** Wraps side panel in portal for easy top-level rendering*/
  hoist: PropTypes.bool,
  type: PropTypes.oneOf(['toolbar']).isRequired,
  toolbarType: PropTypes.oneOf(['primary', 'secondary']),
};

const defaultProps = {
  border: false,
  children: null,
  closeButtonProps: {},
  closeButtonIcon: 'x',
  hideCloseButton: false,
  hoist: false,
  open: true,
  title: '',
  onClose() {},
  className: '',
  contentClassName: '',
  toolbarType: 'primary',
};

/**
 * SidePanel may be used inside the rightmost Columns.Column.
 */
const SidePanel = ({
  border,
  children,
  open,
  title,
  onClose,
  className,
  closeButtonProps,
  closeButtonIcon,
  contentClassName,
  toolbarType,
  hideCloseButton,
  hoist,
}) => {
  const actions = (
    <Button
      icon={closeButtonIcon}
      type="transparent"
      innerFocus
      aria-label="Close side panel"
      onClick={onClose}
      {...closeButtonProps}
    />
  );

  return (
    <Portal target="side-panel" active={hoist}>
      {open && (
        <div
          className={classNames('rc-sidepanel', className, {
            'rc-sidepanel-border': border,
          })}
        >
          <div
            className={`rc-sidepanel-toolbar rc-sidepanel-toolbar-${toolbarType}`}
          >
            <Heading as="h6" className="rc-sidepanel-heading">
              {title}
            </Heading>
            {!hideCloseButton && (
              <div className="rc-sidepanel-actions">{actions}</div>
            )}
          </div>
          <div className={`rc-sidepanel-content ${contentClassName}`}>
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};

SidePanel.propTypes = propTypes;
SidePanel.defaultProps = defaultProps;

export default SidePanel;
