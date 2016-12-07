import React from 'react';
import Button from '../library/Button';
import Modal from '../library/Modal';

class Modals extends React.Component {

  constructor(props) {
    super(props);

    this.state = { default: false };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  renderModal() {
    let jsx;

    if (this.state.open) {
      const actions = [
        <Button label="Submit" />,
      ];

      jsx = (
        <Modal
          title="I am a happy modal"
          sidebar="testing"
          onClose={ this.onClick }
          actions={ actions }
        >
          Hello world
      </Modal>
      );
    }

    return jsx;
  }

  render() {
    const modal = this.renderModal();

    return (
      <div>
        <h1>Modals</h1>
        <Button label="Default Modal" onClick={ this.onClick } />
        { modal }
      </div>
    );
  }
}

export default Modals;
