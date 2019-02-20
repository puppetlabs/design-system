import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import Heading from '../heading';
import Text from '../text';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  /** Displays the name of the user in the sidebar's footer */
  username: PropTypes.string,
  /** Displays the version of the software in the sidebar's footer */
  version: PropTypes.string,
  /** Function fired if the username and version section is clicked */
  onClick: PropTypes.func,
  minimized: PropTypes.bool,
};

const defaultProps = {
  username: '',
  version: '',
  minimized: false,
  onClick() {},
};

const SidebarFooter = ({ username, version, onClick, minimized }) => {
  let meta;

  if (!minimized) {
    meta = (
      <div className="rc-sidebar-footer-meta-details">
        <Heading as="h6" className="rc-sidebar-footer-meta-username">
          {username}
        </Heading>
        <Text size="small" className="rc-sidebar-footer-meta-version">
          Version: {version}
        </Text>
      </div>
    );
  }

  return (
    <div className="rc-sidebar-footer">
      <div
        role="button"
        tabIndex={0}
        className="rc-sidebar-footer-meta"
        onClick={onClick}
        onKeyPress={e => {
          if (e.keyCode === ENTER_KEY_CODE) {
            onClick();
          }
        }}
      >
        <Icon
          size="large"
          type="user"
          className="rc-sidebar-footer-meta-user-icon"
        />
        {meta}
      </div>
    </div>
  );
};

SidebarFooter.propTypes = propTypes;
SidebarFooter.defaultProps = defaultProps;

export default SidebarFooter;
