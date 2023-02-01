import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import scrollIntoView from 'scroll-into-view-if-needed';
import { ENTER_KEY_CODE } from '../../constants';

const DetailPropTypes = {
  /** The element to use for the detail title */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** The title of the detail dropdown */
  title: PropTypes.string,
  /** The content of the detail dropdown */
  children: PropTypes.node,
  /** Controls the open/closed state off the detail */
  open: PropTypes.bool,
  /** The class name to be used for the detail dropdown */
  className: PropTypes.string,
  /** The function to call when the detail dropdown opens */
  onOpen: PropTypes.func,
  /** The function to call when the detail dropdown closes */
  onClose: PropTypes.func,
  /** If true, will display a divider at the end of the details dropdown. Default is set to true */
  divider: PropTypes.bool,
  /** Disables the details summary dropdown */
  disabled: PropTypes.bool,
  /** Arrow position */
  arrow: PropTypes.oneOf(['before', 'after']),
  /** The ref to be used for the detail dropdown */
  inputRef: PropTypes.oneOf[(PropTypes.shape({}), PropTypes.func)],
  /** If true, will unmount the detail content (children) when closed. Default is set to true. */
  unmountOnClose: PropTypes.bool,
  /** The id (key) to be used for the detail dropdown */
  id: PropTypes.string,
  /** The style to be used for the detail dropdown */
  style: PropTypes.shape({}),
};

const defaultProps = {
  as: 'b',
  divider: true,
  disabled: false,
  open: false,
  title: '',
  children: null,
  className: '',
  onOpen: undefined,
  onClose: undefined,
  inputRef: null,
  arrow: 'before',
  unmountOnClose: true,
  id: ``,
  style: undefined,
};

const Detail = ({
  as: Element,
  title,
  children,
  open,
  onClose,
  onOpen,
  divider,
  disabled,
  className,
  inputRef,
  arrow,
  unmountOnClose,
  id,
  style,
}) => {
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef(null);
  const showContentToggle = ({ currentTarget = {} }) => {
    if (!!showContent !== currentTarget.open) {
      if (currentTarget.open && onOpen) onOpen();
      if (!currentTarget.open && onClose) onClose();
      setShowContent(!!currentTarget.open);
    }
  };

  useEffect(() => {
    if (showContent !== !!open || (disabled && showContent)) {
      if (disabled) setShowContent(false);
      else setShowContent(!!open);
    }
  }, [open, disabled]);

  useEffect(() => {
    // Scroll into view if the content is open
    if (showContent && contentRef.current) {
      scrollIntoView(contentRef.current, {
        inline: 'end',
        scrollMode: 'nearest',
      });
    }
  }, [showContent]);

  const keyToggle = e =>
    e.key === ENTER_KEY_CODE ? showContentToggle(e) : null;

  const unmount = unmountOnClose && !showContent;
  return (
    <details
      className={classNames(
        'rc-detail',
        'rc-text',
        showContent && divider && 'rc-detail-divider',
        disabled && 'disabled',
        className,
      )}
      onToggle={showContentToggle}
      open={showContent}
      itemID={id || title}
      style={style}
    >
      <summary
        ref={inputRef}
        role="button"
        className={classNames('rc-detail-summary', arrow)}
        onKeyPress={keyToggle}
      >
        <Element>{title}</Element>
      </summary>
      {unmount ? null : <div ref={contentRef}>{children}</div>}
    </details>
  );
};

Detail.displayName = 'Detail';
Detail.propTypes = DetailPropTypes;
Detail.defaultProps = defaultProps;

export default Detail;
