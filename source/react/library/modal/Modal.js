import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import Button from '../button';

import ModalTitle from './ModalTitle';
import ModalActions from './ModalActions';

const propTypes = {
  /** Additional classes to add in addition to 'rc-modal' */
  className: PropTypes.string,
  /** Allow closing via the ESC key and clicking outside the modal */
  closeOnEscapeAndOverlay: PropTypes.bool,
  /** A boolean to toggle the modal open and closed */
  isOpen: PropTypes.bool,
  /** Function to call when the close button is clicked or ESC is pressed */
  onClose: PropTypes.func,
  /** Optional additional className passed to the modal overlay */
  overlayClassName: PropTypes.string,
  /** Modal content */
  children: PropTypes.node,
};
const defaultProps = {
  className: '',
  closeOnEscapeAndOverlay: true,
  isOpen: true,
  onClose: () => {},
  overlayClassName: '',
  children: null,
};

/**
 * `Modal` renders content in an accessible dialog box above the main content of
 * a page
 */
const Modal = ({
  children,
  className,
  closeOnEscapeAndOverlay,
  isOpen,
  onClose,
  overlayClassName,
  ...props
}) => (
  <ReactModal
    // https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
    // "The aria-modal property introduced by ARIA 1.1 replaces aria-hidden
    // for informing assistive technologies that content outside a dialog is
    // inert." Thus, we can omit `aria-hidden` with this prop and add
    // `aria-modal` with the modal prop below.
    ariaHideApp={false}
    className={classNames('rc-modal', className)}
    isOpen={isOpen}
    onRequestClose={closeOnEscapeAndOverlay ? onClose : undefined}
    overlayClassName={`rc-modal-overlay ${overlayClassName}`}
    aria={{ modal: true }}
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

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.Title = ModalTitle;
Modal.Actions = ModalActions;

export default Modal;
