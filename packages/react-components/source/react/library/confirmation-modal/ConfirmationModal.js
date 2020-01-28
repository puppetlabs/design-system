import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import Button from '../button';

const propTypes = {
  /** Optional modal title */
  title: PropTypes.string,
  /** Optional modal string content */
  description: PropTypes.string,
  /** Confirmation button label */
  confirmLabel: PropTypes.string,
  /** Cancel button label */
  cancelLabel: PropTypes.string,
  /** Confirm button type, default resembles a secondary button */
  confirmButtonType: PropTypes.string,
  /** Cancel button type, default resembles a secondary button */
  cancelButtonType: PropTypes.string,
  /** Function to call when action is confirmed */
  onConfirm: PropTypes.func,
  /** Function to call when action is cancelled, close button is clicked, or ESC is pressed */
  onCancel: PropTypes.func,
};
const defaultProps = {
  title: '',
  description: '',
  confirmLabel: '',
  cancelLabel: '',
  confirmButtonType: '',
  cancelButtonType: '',
  onConfirm: () => {},
  onCancel: () => {},
};

const ConfirmationModal = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  confirmButtonType,
  cancelButtonType,
  onConfirm,
  onCancel,
}) => (
  <Modal onClose={onCancel}>
    <Modal.Title>{title}</Modal.Title>
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
