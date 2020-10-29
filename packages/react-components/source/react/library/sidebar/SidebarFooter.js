import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Heading from '../heading';
import Text from '../text';
import Avatar from '../avatar';
import classnames from 'classnames';
import Button from '../button';

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
  /** Boolean flag to enable or disable (default) signout button */
  enableSignout: PropTypes.bool,
  /** Signout callback function */
  onSignout: PropTypes.func,
};

const defaultProps = {
  as: 'button',
  username: '',
  version: '',
  minimized: false,
  profileIcon: null,
  enableSignout: false,
  onSignout: () => {},
};

const SidebarFooter = ({
  as,
  username,
  version,
  minimized,
  profileIcon: profileIconProp,
  enableSignout,
  onSignout,
  ...rest
}) => {
  const Component = as;
  let meta;
  let signout;

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

    if (enableSignout) {
      signout = (
        <Button
          className="rc-sidebar-footer-button-signout"
          onClick={onSignout}
        >
          <Icon type="sign-out" className="rc-sidebar-footer-signout-icon" />
        </Button>
      );
    }
  }

  return (
    <div className="rc-sidebar-footer">
      <Component
        className={classnames('rc-sidebar-footer-button-user', {
          'rc-sidebar-footer-button-minimized': minimized,
          'rc-sidebar-footer-clickable': rest.onClick,
        })}
        {...rest}
      >
        <div className="rc-sidebar-footer-meta-user">
          {profileIconProp ? (
            <Avatar>{profileIconProp}</Avatar>
          ) : (
            <Icon type="profile" className="rc-sidebar-footer-meta-user-icon" />
          )}
        </div>
        {meta}
      </Component>
      {signout}
    </div>
  );
};

SidebarFooter.propTypes = propTypes;
SidebarFooter.defaultProps = defaultProps;

export default SidebarFooter;
