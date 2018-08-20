import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

/**
 * `Content` is a container component for rendering other React components.
 */

const Content = props => {
  const classNames = classnames('rc-content', props.className);

  return <div className={classNames}>{props.children}</div>;
};

Content.propTypes = propTypes;

export default Content;
