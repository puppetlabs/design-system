import React from 'react';
import PropTypes from 'prop-types';

import md5 from 'blueimp-md5';

const propTypes = {
  email: PropTypes.string,
  className: PropTypes.string,
};

const Gravatar = ({ email, className }) => (
  <img
    className={ className }
    src={ `http://www.gravatar.com/avatar/${md5(email)}` }
  />
);

Gravatar.propTypes = propTypes;

export default Gravatar;
