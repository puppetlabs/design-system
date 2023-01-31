import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import asMenuItem from '../../../helpers/asMenuItem';
import Detail from '../../../library/detail';

const GroupHeadingPropTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  isOpen: PropTypes.bool,
  inputRef: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
  id: PropTypes.string,
};

const defaultProps = {
  inputRef: null,
  show: false,
  isOpen: false,
  title: '',
  id: '',
};
// eslint-disable-next-line react/prop-types
const GroupHeading = ({ title, show, open, onClick, ...props }) =>
  // eslint-disable-next-line react/prop-types, react/destructuring-assignment
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
    />
  ) : (
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    props.children
  );

GroupHeading.propTypes = GroupHeadingPropTypes;
GroupHeading.defaultProps = defaultProps;

export default asMenuItem(GroupHeading);
