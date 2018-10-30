import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number,
  collapse: PropTypes.oneOf([false, 'top', 'bottom', 'all']),
  className: PropTypes.string,
};

const defaultProps = {
  collapse: false,
  height: null,
  className: '',
};

const Row = props => {
  const { height, collapse, children, className } = props;
  const style = {};

  if (height) {
    style.height = `${height}px`;
  }

  const classNames = classnames('rc-grid-row', className, {
    [`rc-grid-row-collapse-${collapse}`]: collapse,
  });

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
