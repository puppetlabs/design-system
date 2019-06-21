import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from '../heading';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const ModalTitle = ({ className, ...rest }) => (
  <Heading
    as="h3"
    className={classNames('rc-modal-title', className)}
    {...rest}
  />
);

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
