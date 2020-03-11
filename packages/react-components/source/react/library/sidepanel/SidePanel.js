import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Heading from '../heading';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  contentClassName: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.oneOf(['toolbar']).isRequired,
};

const defaultProps = {
  children: null,
  open: true,
  title: '',
  onClose() {},
  className: '',
  contentClassName: '',
};

/**
 * SidePanel may be used inside the rightmost Columns.Column.
 */
const SidePanel = ({
  children,
  open,
  title,
  onClose,
  className,
  contentClassName,
}) => {
  const actions = (
    <Button
      icon="close"
      type="transparent"
      innerFocus
      aria-label="Close side panel"
      onClick={onClose}
    />
  );

  return (
    open && (
      <div className={`rc-sidepanel ${className}`}>
        <div className="rc-sidepanel-toolbar">
          <Heading
            as="h5"
            className="rc-sidepanel-heading"
            id="rc-sidepanel-header"
          >
            {title}
          </Heading>
          <div className="rc-sidepanel-actions">{actions}</div>
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
