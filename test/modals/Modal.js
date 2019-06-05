import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Modal from '../../source/react/library/modals/Modal';
import Button from '../../source/react/library/buttons/Button';

describe('<Modal />', () => {
  jsdom({ skipWindowCheck: true });

  const content = 'content';

  it('should render a modal', () => {
    const modal = shallow(<Modal />);

    expect(modal.find('.rc-modal').length).to.equal(1);
  });

  it('should render a close link if onClose is provided', () => {
    const onClose = sinon.spy();
    const modal = shallow(<Modal onRequestClose={onClose} />);

    expect(modal.find('.rc-modal-close').length).to.equal(1);
  });

  // it('should contain a valid title', () => {
  //   const modal = shallow(<Modal title="title">{content}</Modal>);
  //   expect(modal.find('Heading').prop('children')).to.equal('title');
  // });

  // it('should contain a valid content text', () => {
  //   const modal = shallow(<Modal>{content}</Modal>);
  //   expect(
  //     modal
  //       .find('Content')
  //       .childAt(0)
  //       .text(),
  //   ).to.equal(content);
  // });

  // it('should contain a button if actions are provided', () => {
  //   const actions = [<Button key="submit-button">submit</Button>];
  //   const modal = shallow(<Modal actions={actions} />);

  //   expect(modal.find('Button').prop('children')).to.equal('submit');
  // });
});
