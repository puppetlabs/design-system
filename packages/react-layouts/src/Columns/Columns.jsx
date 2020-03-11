import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import './Columns.scss';

const columnsPropTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
const columnsDefaultProps = {
  children: null,
  className: '',
};

const Columns = ({ children, className }) => (
  <div className={classNames('columns', className)}>{children}</div>
);

Columns.propTypes = columnsPropTypes;
Columns.defaultProps = columnsDefaultProps;

const columnPropTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool,
};
const columnDefaultProps = {
  children: null,
  className: '',
  fixed: false,
};

const Column = ({ children, className, fixed }) => (
  <div className={classNames('column', className, { fixed })}>{children}</div>
);

Column.propTypes = columnPropTypes;
Column.defaultProps = columnDefaultProps;

Columns.Column = Column;

export default Columns;
