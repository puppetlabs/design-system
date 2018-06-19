import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.element,
};

/**
 * `Content` is a container component for rendering other React components.
 */

const Content = props => (
  <div className="rc-content">
    { props.children }
  </div>
);

Content.propTypes = propTypes;

export default Content;
