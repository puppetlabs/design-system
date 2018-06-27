import React from 'react';
import PropTypes from 'prop-types';

import Gravatar from '../gravatar/Gravatar';
import Button from '../buttons/Button';
import logos from './logos';

const propTypes = {
  avatarEmail: PropTypes.string,
  nav: PropTypes.array,
};

const defaultProps = {
  nav: [],
};

const renderNav = nav => nav.map(n => (
  <Button size="tiny" key={ n.href } transparent icon={ n.icon } />
));

const renderAvatar = email => (
  <Gravatar
    className="rc-header-avatar"
    email={ email }
  />
);

const Header = (props) => {
  const avatar = renderAvatar(props.avatarEmail);
  const nav = renderNav(props.nav);

  return (
    <div className="rc-header">
      <div className="rc-header-left">
        { logos.insights }
      </div>
      <div className="rc-header-right">
        { nav }
        { avatar }
      </div>
    </div>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
