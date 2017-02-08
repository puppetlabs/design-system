import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import { BareModal as Modal } from '../../source/react/library/modals/Modal';
import Button from '../../source/react/library/Button';

describe('<Modal />', () => {
  jsdom();

  const content = 'content';
  const sidebar = 'sidebar';

  it('should render a modal', () => {
    const modal = shallow(<Modal />);

    expect(modal.find('.rc-modal').length).to.equal(1);
  });

  it('should render a close link if onClose is provided', () => {
    const onClose = sinon.spy();
    const modal = shallow(<Modal onClose={ onClose } />);

    expect(modal.find('.rc-modal-close').length).to.equal(1);
  });

  it('should not render a close link if onClose is not provided', () => {
    const modal = shallow(<Modal />);

    expect(modal.find('.rc-modal-close').length).to.equal(0);
  });

  it('should contain a valid sidebar text', () => {
    const modal = shallow(<Modal sidebar={ sidebar } />);

    expect(modal.find('.rc-modal-sidebar').text()).to.equal(sidebar);
  });

  it('should contain a valid content text', () => {
    const modal = shallow(<Modal>{ content }</Modal>);

    expect(modal.text()).to.equal(content);
  });

  it('should contain a button if actions are provided', () => {
    const actions = [<Button key="submit-button" label="submit" />];
    const modal = shallow(<Modal actions={ actions } />);

    expect(modal.find('Button').prop('label')).to.equal('submit');
  });

  it('should contain an actionsCTA if one is provided', () => {
    const actions = [<Button key="submit-button" label="submit" />];
    const modal = shallow(<Modal actionsCTA="happy actions cta" actions={ actions } />);

    expect(modal.find('.rc-modal-actions-cta').text()).to.eql('happy actions cta');
  });
});
