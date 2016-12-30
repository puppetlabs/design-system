import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import Modal from '../library/modals/Modal';

class Modals extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openDefault: false,
      openSmall: false,
    };

    this.onToggleDefault = this.onToggleDefault.bind(this);
    this.onToggleSmall = this.onToggleSmall.bind(this);
  }

  onToggleDefault() {
    this.setState({ openDefault: !this.state.openDefault });
  }

  onToggleSmall() {
    this.setState({ openSmall: !this.state.openSmall });
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

  renderSmallModal() {
    let jsx;


    if (this.state.openSmall) {
      jsx = <Modal size="small" onClose={ this.onToggleSmall }>Small Modal</Modal>;
    }

    return jsx;
  }

  render() {
    const modal = this.renderModal();
    const smallModal = this.renderSmallModal();

    return (
      <div>
        <h1>Modals</h1>
        <StyleguideSection title="Default Modal">
          <Button label="Default Modal" onClick={ this.onToggleDefault } />
        </StyleguideSection>
        <StyleguideSection title="Small Modal">
          <Button label="Small Modal" onClick={ this.onToggleSmall } />
        </StyleguideSection>
        { modal }
        { smallModal }
      </div>
    );
  }
}

export default Modals;
