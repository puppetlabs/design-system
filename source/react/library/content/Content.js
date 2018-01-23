import React from 'react';

const propTypes = {
  children: React.PropTypes.element,
};

const Content = props => (
  <div className="rc-content">
    { props.children }
  </div>
);

Content.propTypes = propTypes;

export default Content;
