import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Modal from '../../source/react/library/modals/Modal';
import Button from '../../source/react/library/Button';

describe('<Modal />', () => {
  jsdom();

  const title = 'title';
  const content = 'content';
  const sidebar = 'sidebar';

  beforeEach(() => {
    document.getElementsByTagName('body')[0].innerHTML = '';
  });

  it('should render a modal', () => {
    mount(<Modal />);

    expect(document.getElementsByClassName('rc-modal').length).to.equal(1);
  });

  it('should render a close link if onClose is provided', () => {
    const onClose = sinon.spy();
    mount(<Modal onClose={ onClose } />);

    expect(document.getElementsByClassName('rc-modal-close-link').length).to.equal(0);
  });

  it('should not render a close link if onClose is not provided', () => {
    mount(<Modal />);

    expect(document.getElementsByClassName('rc-modal-close-link').length).to.equal(0);
  });

  it('should contain a valid title', () => {
    mount(<Modal title={ title } />);

    expect(document.getElementsByClassName('rc-modal-title')[0].innerHTML).to.equal(title);
  });

  it('should contain a valid sidebar text', () => {
    mount(<Modal sidebar={ sidebar } />);

    expect(document.getElementsByClassName('rc-modal-sidebar')[0].innerHTML).to.equal(sidebar);
  });

  it('should contain a valid content text', () => {
    mount(<Modal>{ content }</Modal>);

    expect(document.getElementsByClassName('rc-modal-content')[0].innerHTML).to.equal(content);
  });

  it('should contain a button if actions are provided', () => {
    const actions = [<Button key="submit-button" label="submit" />];
    mount(<Modal actions={ actions } />);

    expect(document.getElementsByClassName('rc-button-content')[0].innerHTML).to.equal('submit');
  });
});
