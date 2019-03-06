import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {
  /**  What do we do when user clicks remove button? */
  onRemove: PropTypes.func,
  /**  What do we do (if anything) when user clicks body content? */
  onClick: PropTypes.func,
  /**  Tag body content */
  children: PropTypes.node,
  /**  Is clicking/removing disabled? */
  disabled: PropTypes.bool,
  /**  Optional additional classes */
  className: PropTypes.string,
  /**  Optional additional inline styes */
  style: PropTypes.shape({}),
};

const defaultProps = {
  onRemove() {},
  onClick: null,
  children: null,
  disabled: false,
  className: '',
  style: null,
};

/**
 * `Tag` is used to repesent a removable and optionally clickable item.
 */
const Tag = ({ disabled, children, onClick, onRemove, className, style }) => {
  const tagClassNames = classnames('rc-tag', className, {
    'rc-tag-disabled': disabled,
  });

  const mainContentClassNames = classnames('rc-tag-main-content', {
    'rc-tag-clickable': onClick,
  });

  return (
    <div className={tagClassNames} style={style}>
      <button
        type="button"
        className={mainContentClassNames}
        onClick={onClick}
        disabled={disabled || !onClick}
      >
        {children}
      </button>
      <button
        type="button"
        className="rc-tag-remove-button"
        onClick={onRemove}
        disabled={disabled}
      >
        <Icon type="close" size="tiny" />
      </button>
    </div>
  );
};

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
