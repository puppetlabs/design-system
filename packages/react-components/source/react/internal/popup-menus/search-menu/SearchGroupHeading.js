import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../../../library/button';

const GroupHeadingPropTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

const defaultProps = {
  inputRef: null,
  isOpen: false,
  title: '',
};
const GroupHeading = ({ title, isOpen, inputRef, ...props }) =>
  isOpen ? (
    <Button
      {...props}
      ref={inputRef}
      type="transparent"
      innerFocus
      trailingIcon={`chevron-${isOpen ? 'up' : 'down'}`}
      className={classNames('rc-search-menu-list-group')}
    >
      <h6 className={classNames('rc-heading', 'rc-heading-h6')}>{title}</h6>
    </Button>
  ) : null;

GroupHeading.propTypes = GroupHeadingPropTypes;
GroupHeading.defaultProps = defaultProps;

export default GroupHeading;
