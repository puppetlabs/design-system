import React from 'react';
import Modal from './Modal';
import Button from '../buttons/Button';

const propTypes = {
  onCancel: React.PropTypes.func,
  onConfirm: React.PropTypes.func,
  children: React.PropTypes.any,
  confirmationMessage: React.PropTypes.string,
  /** Indicate that we've seen the confirmation, and are performing the action. */
  processingConfirmation: React.PropTypes.bool,
};

const defaultProps = {
  confirmationMessage: '',
  processingConfirmation: false,
  onCancel: null,
  onConfirm: null,
  children: null,
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
    e.preventDefault();

    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  onConfirm(e) {
    e.preventDefault();

    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  show(e) {
    e.stopPropagation();

    this.stateState({ open: true });
  }

  render() {
    const actions = [
      <Button
        key="cancel-button"
        label="cancel"
        size="small"
        onClick={ this.onCancel }
      />,
      <Button
        key="submit-button"
        label="confirm"
        size="small"
        onClick={ this.onConfirm }
        processing={ this.props.processingConfirmation }
      />,
    ];

    return (
      <Modal actions={ actions } size="small" margin="auto">
        <h3>{ this.props.confirmationMessage }</h3>
        { this.props.children }
      </Modal>
    );
  }
}

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

export default ConfirmationModal;
