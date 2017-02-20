import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import Modal from '../library/modals/Modal';
import ConfirmationModal from '../library/modals/ConfirmationModal';

class Modals extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openDefault: false,
      openLeftSidebarModal: false,
      openSmall: false,
      openConfirm: false,
    };

    this.onToggleDefault = this.onToggleDefault.bind(this);
    this.onToggleLeftSidebar = this.onToggleLeftSidebar.bind(this);
    this.onToggleSmall = this.onToggleSmall.bind(this);
    this.onToggleConfirm = this.onToggleConfirm.bind(this);
  }

  onToggleDefault() {
    this.setState({ openDefault: !this.state.openDefault });
  }

  onToggleLeftSidebar() {
    this.setState({ openLeftSidebarModal: !this.state.openLeftSidebarModal });
  }

  onToggleSmall() {
    this.setState({ openSmall: !this.state.openSmall });
  }

  onToggleConfirm() {
    this.setState({ openConfirm: !this.state.openConfirm });
  }

  renderModal() {
    let jsx;

    if (this.state.openDefault) {
      const actions = [
        <Button key="submit-button" label="Submit" />,
      ];

      jsx = (
        <Modal
          title="I am a happy modal"
          sidebar="Happy Sidebar!"
          onClose={ this.onToggleDefault }
          margin={ 200 }
          actions={ actions }
          actionsCTA="I'm a happy action cta!"
        >
          Happy Content!
        </Modal>
      );
    }

    return jsx;
  }

  renderLeftSidebarModal() {
    let jsx;

    if (this.state.openLeftSidebarModal) {
      const actions = [
        <Button key="submit-button" label="Submit" />,
      ];

      jsx = (
        <Modal
          title="I am a happy modal"
          sidebar="Happy Sidebar!"
          sidebarPosition="left"
          onClose={ this.onToggleDefault }
          margin={ 200 }
          actions={ actions }
          actionsCTA="I'm a happy action cta!"
        >
          Happy Content!
        </Modal>
      );
    }

    return jsx;
  }

  renderSmallModal() {
    let jsx;

    if (this.state.openSmall) {
      jsx = <Modal size="small" onClose={ this.onToggleSmall }>Small Modal</Modal>;
    }

    return jsx;
  }

  renderConfirmationModal() {
    let jsx;

    if (this.state.openConfirm) {
      jsx = (
        <ConfirmationModal
          onCancel={ this.onToggleConfirm }
          onConfirm={ () => console.log('confirmed!') }
          confirmationMessage="Are you really sure you want to proceed?"
        />
      );
    }

    return jsx;
  }

  render() {
    const modal = this.renderModal();
    const leftSidebarModal = this.renderLeftSidebarModal();
    const confirmationModal = this.renderConfirmationModal();
    const smallModal = this.renderSmallModal();

    return (
      <div>
        <h1>Modals</h1>
        <StyleguideSection title="Default Modal">
          <Button label="Default Modal" onClick={ this.onToggleDefault } />
        </StyleguideSection>
        <StyleguideSection title="Left Sidebar Modal">
          <Button label="Left Sidebar Modal" onClick={ this.onToggleLeftSidebar } />
        </StyleguideSection>
        <StyleguideSection title="Small Modal">
          <Button label="Small Modal" onClick={ this.onToggleSmall } />
        </StyleguideSection>
        <StyleguideSection title="Confirmation Modal">
          <Button label="Confirmation Modal" onClick={ this.onToggleConfirm } />
        </StyleguideSection>
        { modal }
        { leftSidebarModal }
        { smallModal }
        { confirmationModal }
      </div>
    );
  }
}

export default Modals;
