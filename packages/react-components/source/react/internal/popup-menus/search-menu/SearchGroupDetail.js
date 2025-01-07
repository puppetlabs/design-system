import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import asFocusItem from '../../../helpers/asFocusItem';
import Detail from '../../../library/detail';

const GroupDetailPropTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  isOpen: PropTypes.bool,
  inputRef: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
  id: PropTypes.string,
  ...Detail.propTypes,
};

const defaultProps = {
  inputRef: null,
  show: false,
  isOpen: false,
  title: '',
  id: '',
};

const GroupDetail = ({ title, show, open, onClick, children, ...props }) =>
  show ? (
    <Detail
      {...props}
      onOpen={onClick}
      onClose={onClick}
      className={classNames('rc-search-menu-list-group', { open })}
      title={title}
      open={open}
      arrow="after"
      divider={false}
    >
      {children}
    </Detail>
  ) : (
    children
  );

GroupDetail.propTypes = GroupDetailPropTypes;
GroupDetail.defaultProps = defaultProps;

export default asFocusItem(GroupDetail);
