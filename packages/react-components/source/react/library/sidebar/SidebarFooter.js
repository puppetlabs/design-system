import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Heading from '../heading';
import Text from '../text';

const propTypes = {
  /** The root HTML element  */
  as: PropTypes.elementType,
  /** Displays the name of the user in the sidebar's footer */
  username: PropTypes.string,
  /** Displays the version of the software in the sidebar's footer */
  version: PropTypes.string,
  /** Has the parent sidebar been minimized? If so render the minimized version of the footer. Don't worry about setting this manually. The parent components will add this prop for you. */
  minimized: PropTypes.bool,
  /** Displays an element of the users choice * */
  profileIcon: PropTypes.node,
};

const defaultProps = {
  as: 'button',
  username: '',
  version: '',
  minimized: false,
  profileIcon: null,
};

const SidebarFooter = ({
  as,
  username,
  version,
  minimized,
  profileIcon: profileIconProp,
  ...rest
}) => {
  const Component = as;
  let meta;

  if (!minimized) {
    meta = (
      <div className="rc-sidebar-footer-meta-details">
        <Heading as="h6" className="rc-sidebar-footer-meta-username">
          {username}
        </Heading>
        {version && (
          <Text size="tiny" className="rc-sidebar-footer-meta-version">
            Version: {version}
          </Text>
        )}
      </div>
    );
  }

  return (
    <Component className="rc-sidebar-footer" {...rest}>
      <div className="rc-sidebar-footer-meta-user">
        {profileIconProp || (
          <Icon type="profile" className="rc-sidebar-footer-meta-user-icon" />
        )}
      </div>
      {meta}
    </Component>
  );
};

SidebarFooter.propTypes = propTypes;
SidebarFooter.defaultProps = defaultProps;

export default SidebarFooter;
