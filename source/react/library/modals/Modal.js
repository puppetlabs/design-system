import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import Button from '../buttons/Button';

import ModalTitle from './ModalTitle';
import ModalActions from './ModalActions';

const propTypes = {
  /** Actions to render */
  actions: PropTypes.node,
  /** The selector for your top-level app element */
  appElementSelector: PropTypes.string,
  /** Additional classes to add in addition to 'rc-modal' */
  className: PropTypes.string,
  /** Allow closing via the ESC key and clicking outside the modal */
  closeOnEscapeAndOverlay: PropTypes.bool,
  /** A boolean to toggle the modal open and closed */
  isOpen: PropTypes.bool,
  /** Function to call when the close button is clicked or ESC is pressed */
  onClose: PropTypes.func,
};
const defaultProps = {
  actions: null,
  appElementSelector: 'body',
  className: '',
  closeOnEscapeAndOverlay: true,
  isOpen: true,
  onClose: () => {},
};

/**
 * `Modal` renders content in an accessible dialog box above the main content of
 * a page
 */
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
      closeOnEscapeAndOverlay,
      isOpen,
      onClose,
      overlayClassName,
      ...props
    } = this.props;

    return (
      <ReactModal
        className={classNames('rc-modal', className)}
        isOpen={isOpen}
        onRequestClose={closeOnEscapeAndOverlay ? onClose : undefined}
        overlayClassName={`rc-modal-overlay ${overlayClassName}`}
        aria={{
          modal: true,
        }}
        {...props}
      >
        <Button
          className="rc-modal-close"
          icon="x"
          type="transparent"
          onClick={onClose}
        />
        {children}
      </ReactModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.Title = ModalTitle;
Modal.Actions = ModalActions;

export default Modal;
