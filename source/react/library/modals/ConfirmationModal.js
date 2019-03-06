import PropTypes from 'prop-types';
import React from 'react';
import Modal from './Modal';
import Button from '../buttons/Button';

const propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
  confirmationMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  title: PropTypes.string,
  /** Indicate that we've seen the confirmation, and are performing the action. */
  processingConfirmation: PropTypes.bool,
  strings: PropTypes.shape({
    cancel: PropTypes.string,
    confirm: PropTypes.string,
  }),
  actionsPosition: PropTypes.oneOf(['left', 'right']),
  background: PropTypes.oneOf(['transparent', 'translucent']),
};

const defaultStrings = {
  /* Custom label for cancel button */
  cancel: 'Cancel',
  /* Custom label for confirm button */
  confirm: 'Confirm',
};

const defaultProps = {
  confirmationMessage: '',
  title: '',
  processingConfirmation: false,
  onCancel: null,
  onConfirm: null,
  children: null,
  actionsPosition: 'right',
  strings: defaultStrings,
  background: 'transparent',
};

/**
 * `ConfirmationModal` renders a confirmation for the user to confirm or cancel an action.
 */

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);

    this.show = this.show.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onCancel(e) {
    const { onCancel } = this.props;
    e.preventDefault();

    if (onCancel) {
      onCancel();
    }
  }

  onConfirm(e) {
    const { onConfirm } = this.props;
    e.preventDefault();

    if (onConfirm) {
      onConfirm();
    }
  }

  show(e) {
    e.stopPropagation();

    this.stateState({ open: true });
  }

  render() {
    const {
      actionsPosition,
      processingConfirmation,
      title,
      confirmationMessage,
      children,
      strings,
      background,
    } = this.props;

    let actions;

    const submitButton = (
      <Button
        key="submit-button"
        onClick={this.onConfirm}
        loading={processingConfirmation}
      >
        {strings.confirm}
      </Button>
    );

    const cancelButton = (
      <Button type="tertiary" key="cancel-button" onClick={this.onCancel}>
        {strings.cancel}
      </Button>
    );

    if (actionsPosition === 'left') {
      actions = [submitButton, cancelButton];
    } else {
      actions = [cancelButton, submitButton];
    }

    return (
      <Modal
        actionsPosition={actionsPosition}
        actions={actions}
        size="small"
        title={title}
        background={background}
      >
        <span className="rc-modal-message">{confirmationMessage}</span>
        {children}
      </Modal>
    );
  }
}

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

export default ConfirmationModal;
