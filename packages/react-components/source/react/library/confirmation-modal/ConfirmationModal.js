import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import Button from '../button';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  confirmButtonType: PropTypes.string,
  cancelButtonType: PropTypes.string,
  onConfirm: PropTypes.func,
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
