import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import Heading from '../heading';
import Text from '../text';

const propTypes = {
  /** Displays the name of the user in the sidebar's footer */
  username: PropTypes.string,
  /** Displays the version of the software in the sidebar's footer */
  version: PropTypes.string,
};

const defaultProps = {
  username: '',
  version: '',
};

const Footer = ({ username, version }) => (
  <div className="rc-sidebar-footer">
    <Icon size="large" type="user" className="rc-sidebar-user-icon" />
    <div className="rc-sidebar-footer-details">
      <Heading as="h6" className="rc-sidebar-footer-username">
        {username}
      </Heading>
      <Text size="small" className="rc-sidebar-footer-version">
        Version: {version}
      </Text>
    </div>
  </div>
);

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
