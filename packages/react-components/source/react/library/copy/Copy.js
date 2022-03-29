import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';

const propTypes = {
  /** Copy icon alignment */
  align: PropTypes.oneOf(['center', 'flex-end']),
  /** Optional additional className */
  className: PropTypes.string,
  /** Component children */
  children: PropTypes.node,
  /** Optional function be called after copy-to-clipboard */
  onCopy: PropTypes.func,
  /** Optional function be called if copy-to-clipboard fails */
  onCopyError: PropTypes.func,
  /** Value to copy, overrides text in child nodes */
  value: PropTypes.string,
  /** Click-to-copy handler. */
  writeToClipboard: PropTypes.func,
};

const defaultProps = {
  align: 'center',
  children: null,
  className: '',
  onCopy: () => {},
  onCopyError: () => {},
  value: null,
  writeToClipboard: value => navigator.clipboard.writeText(value),
};

const Copy = ({
  align,
  children,
  className,
  onCopy,
  onCopyError,
  value,
  writeToClipboard,
}) => {
  let copyValue = value;

  const copy = async () => {
    try {
      // this will prompt a user to grant clipboard access if not granted. If the user blocks access this promise will reject
      await writeToClipboard(copyValue);
      onCopy(copyValue);
    } catch (e) {
      onCopyError(copyValue);
    }
  };

  if (!copyValue) {
    try {
      const child = React.Children.only(children);
      // An explicitly set `value` prop on the child node supercedes child text
      // value = child.props?.children ? child.props.children : value;
      if (typeof child.props?.children === 'string')
        copyValue = child.props.children;

      if (child.props?.value) copyValue = child.props.value;
    } catch (e) {
      // If `children` is not a single React element, a string node is a valid value
      if (typeof React.Children.toArray(children)[0] === 'string')
        [copyValue] = React.Children.toArray(children);
    }
  }

  // If copyValue is still null after checking children for valid values, return null
  if (!copyValue) return null;

  return (
    <div className={classNames('copy', `copy-${align}`, className)}>
      <div className="copy-input">{children}</div>
      <Button
        icon="copy"
        className="value-copy-button"
        type="secondary"
        onClick={copy}
      />
    </div>
  );
};

Copy.propTypes = propTypes;
Copy.defaultProps = defaultProps;

export default Copy;
