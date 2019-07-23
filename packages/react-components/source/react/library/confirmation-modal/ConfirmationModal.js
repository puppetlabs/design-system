import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import Button from '../button';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  confirmButton: PropTypes.string,
  cancelButton: PropTypes.string,
  confirmButtonType: PropTypes.string,
  cancelButtonType: PropTypes.string,
  confirmAction: PropTypes.func,
  cancelAction: PropTypes.func,
};
const defaultProps = {
  title: '',
  description: '',
  confirmButton: '',
  cancelButton: '',
  confirmButtonType: '',
  cancelButtonType: '',
  confirmAction: () => {},
  cancelAction: () => {},
};

const ConfirmationModal = ({
  title,
  description,
  confirmButton,
  cancelButton,
  confirmButtonType,
  cancelButtonType,
  confirmAction,
  cancelAction,
}) => (
  <Modal onClose={cancelAction}>
    <Modal.Title>{title}</Modal.Title>
    {description}
    <Modal.Actions>
      <Button type={confirmButtonType} onClick={confirmAction}>
        {confirmButton}
      </Button>
      <Button type={cancelButtonType} onClick={cancelAction}>
        {cancelButton}
      </Button>
    </Modal.Actions>
  </Modal>
);

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

export default ConfirmationModal;
