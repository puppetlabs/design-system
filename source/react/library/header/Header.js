import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons/Button';

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

const renderAvatar = () => (
  <img
    className="rc-header-avatar"
    src="https://www.gravatar.com/avatar/identicon?s=512&d=identicon"
  />
);

const Header = (props) => {
  const avatar = renderAvatar();
  const nav = renderNav(props.nav);

  return (
    <div className="rc-header">
      <div className="rc-header-left">
        Puppet Insights
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
