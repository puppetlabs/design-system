import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import Button from '../button';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  dangerButton: PropTypes.string,
  cancelButton: PropTypes.string,
  dangerAction: PropTypes.func,
  cancelAction: PropTypes.func,
};
const defaultProps = {
  title: '',
  description: '',
  dangerButton: '',
  cancelButton: '',
  dangerAction: () => {},
  cancelAction: () => {},
};

const DestructiveModal = ({
  title,
  description,
  dangerButton,
  cancelButton,
  dangerAction,
  cancelAction,
}) => (
  <Modal onClose={cancelAction}>
    <Modal.Title>{title}</Modal.Title>
    {description}
    <Modal.Actions>
      <Button type="danger" onClick={dangerAction}>
        {dangerButton}
      </Button>
      <Button type="tertiary" onClick={cancelAction}>
        {cancelButton}
      </Button>
    </Modal.Actions>
  </Modal>
);

DestructiveModal.propTypes = propTypes;
DestructiveModal.defaultProps = defaultProps;

export default DestructiveModal;
