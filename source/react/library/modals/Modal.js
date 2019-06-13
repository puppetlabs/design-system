import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import ReactModal from 'react-modal';
import Button from '../buttons/Button';

const propTypes = {
  /** The selector for your top-level app element */
  appElementSelector: PropTypes.string,
  /** Additional classes to add in addition to 'rc-modal' */
  className: PropTypes.string,
  /** A boolean to toggle the modal open and closed */
  isOpen: PropTypes.bool,
  /** Function to call when the close button is clicked or ESC is pressed */
  onRequestClose: PropTypes.func,
  /** Small, medium, and large correspond to 480, 580, and 1200 px wide if the
   * viewport is wide enough
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
const defaultProps = {
  appElementSelector: 'body',
  className: '',
  isOpen: true,
  onRequestClose: () => {},
  size: 'small',
};

/**
 * `Modal` renders content in an accessible dialog box above the main content of
 * a page
 */
// class Modal extends React.Component {
//   render() {
//     return <ReactModal isOpen={false} className="ReactModal__Content" />;
//   }
// }
class Modal extends Component {
  constructor(props) {
    super(props);
    const { appElementSelector } = this.props;

    ReactModal.setAppElement(appElementSelector);
  }

  render() {
    const {
      children,
      className,
      isOpen,
      onRequestClose,
      overlayClassName,
      size,
      ...props
    } = this.props;

    const modalClassName = classname('rc-modal', `rc-modal-${size}`, className);

    return (
      <ReactModal
        className={modalClassName}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName={`rc-modal-overlay ${overlayClassName}`}
        {...props}
      >
        <div className="rc-modal-content">{children}</div>
        <Button
          className="rc-modal-close"
          icon="x"
          type="transparent"
          onClick={onRequestClose}
        />
      </ReactModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
