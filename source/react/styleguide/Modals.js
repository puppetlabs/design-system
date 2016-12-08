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
          sidebar="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mi in nulla iaculis euismod sed ac lacus. In elementum ex sed velit tincidunt sollicitudin. Praesent dui magna, euismod venenatis turpis ac, elementum sagittis sapien. Fusce congue libero ante, in dapibus diam dictum eget. Vestibulum iaculis magna ut ante iaculis cursus. Nam efficitur eros a nibh laoreet bibendum. Suspendisse tincidunt efficitur luctus. Cras sed tempus mi. Sed malesuada lobortis urna ut tincidunt. In vel tellus malesuada, mattis lectus nec, rutrum eros.

Quisque eget dui iaculis, vehicula ligula nec, congue arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nulla ac elit elementum ullamcorper. Phasellus efficitur lacinia ex non auctor. Nam cursus a est malesuada scelerisque. Mauris augue mauris, scelerisque at est sit amet, vestibulum molestie odio. Pellentesque dapibus laoreet elit, nec euismod nulla congue eget. Phasellus vel placerat leo, in convallis eros. Vivamus dolor elit, imperdiet sit amet molestie ac, aliquam nec sapien."
          onClose={ this.onClick }
          actions={ actions }
        >
          I really am happy, i swear!
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
