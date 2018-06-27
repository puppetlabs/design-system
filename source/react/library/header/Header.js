import React from 'react';
import PropTypes from 'prop-types';

import Gravatar from '../gravatar';
import Button from '../buttons/Button';
import logos from './logos';

const propTypes = {
  avatarEmail: PropTypes.string,
  product: PropTypes.oneOf(['insights']),
  onNavClick: PropTypes.func,
  nav: PropTypes.array,
};

const defaultProps = {
  nav: [],
  onNavClick: () => {},
};

const renderNav = ({ nav, onNavClick }) => nav.map(n => (
  <Button
    size="tiny"
    onClick={ () => onNavClick(n.key) }
    key={ n.key }
    icon={ n.icon }
    transparent
  />
));

const renderAvatar = email => (
  <Gravatar
    className="rc-header-avatar"
    email={ email }
  />
);

const Header = (props) => {
  const avatar = renderAvatar(props.avatarEmail);
  const nav = renderNav(props);

  return (
    <div className="rc-header">
      <div className="rc-header-left">
        { logos[props.product] }
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
