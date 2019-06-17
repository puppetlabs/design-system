import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Button from '../../source/react/library/buttons/Button';
import Modal from '../../source/react/library/modals/Modal';

describe('<Modal />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render a modal', () => {
    const modal = shallow(<Modal />);

    expect(modal.find('.rc-modal').length).to.equal(1);
  });

  it('should render a close link if onClose is provided', () => {
    const onClose = sinon.spy();
    const modal = shallow(<Modal onClose={onClose} />);

    expect(modal.find('.rc-modal-close').length).to.equal(1);
  });

  /**
   * The following tests are failing due to a known incompatibility with react-portal
   * and react-test-renderer, @see https://github.com/facebook/react/issues/11565
   */
  // it('should render a title if provided', () => {
  //   const modal = shallow(
  //     <Modal>
  //       <Modal.Title>title</Modal.Title>
  //       {content}
  //     </Modal>,
  //   );
  //   expect(modal.find('Heading').prop('children')).to.equal('title');
  // });
  //
  // it('should render provided actions', () => {
  //   const button = <Button id="test-button">submit</Button>;
  //
  //   const modal = shallow(
  //     <Modal>
  //       <Modal.Actions>{button}</Modal.Actions>
  //     </Modal>,
  //   );
  //
  //   expect(modal.find('#test-button').prop('children')).to.equal('submit');
  // });
});
