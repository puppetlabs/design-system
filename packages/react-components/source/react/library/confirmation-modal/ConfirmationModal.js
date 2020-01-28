import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import Button from '../button';

const propTypes = {
  /** Heading in the modal window */
  title: PropTypes.string,
  /** Content in the modal window */
  description: PropTypes.string,
  /** A boolean to toggle the modal open and closed */
  isOpen: PropTypes.bool,
  /** Confirmation button label */
  confirmLabel: PropTypes.string,
  /** Cancel button label */
  cancelLabel: PropTypes.string,
  /** Confirm button type, defaults to "primary" */
  confirmButtonType: PropTypes.string,
  /** Cancel button type, defaults to "tertiary" */
  cancelButtonType: PropTypes.string,
  /** Function to call when action is confirmed */
  onConfirm: PropTypes.func,
  /** Function to call when action is cancelled, close button is clicked, or ESC is pressed */
  onCancel: PropTypes.func,
};
const defaultProps = {
  title: '',
  description: '',
  isOpen: true,
  confirmLabel: '',
  cancelLabel: '',
  confirmButtonType: 'primary',
  cancelButtonType: 'tertiary',
  onConfirm: () => {},
  onCancel: () => {},
};

const ConfirmationModal = ({
  title,
  description,
  isOpen,
  confirmLabel,
  cancelLabel,
  confirmButtonType,
  cancelButtonType,
  onConfirm,
  onCancel,
}) => (
  <Modal onClose={onCancel} isOpen={isOpen}>
    {title && <Modal.Title>{title}</Modal.Title>}
    {description}
    <Modal.Actions>
      <Button type={confirmButtonType} onClick={onConfirm}>
        {confirmLabel}
      </Button>
      <Button type={cancelButtonType} onClick={onCancel}>
        {cancelLabel}
      </Button>
    </Modal.Actions>
  </Modal>
);

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

export default ConfirmationModal;
