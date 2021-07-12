import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
import Heading from '../heading';

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
  type: PropTypes.oneOf(['toolbar']).isRequired,
  toolbarType: PropTypes.oneOf(['primary', 'secondary']),
};

const defaultProps = {
  border: false,
  children: null,
  closeButtonProps: {},
  closeButtonIcon: 'x',
  hideCloseButton: false,
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
    open && (
      <div
        className={classNames('rc-sidepanel', className, {
          'rc-sidepanel-border': border,
        })}
      >
        <div
          className={`rc-sidepanel-toolbar rc-sidepanel-toolbar-${toolbarType}`}
        >
          <Heading
            as="h5"
            className="rc-sidepanel-heading"
            id="rc-sidepanel-header"
          >
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
    )
  );
};

SidePanel.propTypes = propTypes;
SidePanel.defaultProps = defaultProps;

export default SidePanel;
