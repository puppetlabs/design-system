import jsdom from 'mocha-jsdom';
import { mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import portal from '../source/react/library/portal';
import Modal from '../source/react/library/modals/Modal';

describe('BareModal wrapped with portal', () => {
  jsdom({ skipWindowCheck: true });

  const renderer = portal(Modal);
  const APP_BASE = document.body;

  const clearDOM = () => {
    while (APP_BASE.hasChildNodes()) {
      APP_BASE.removeChild(APP_BASE.lastChild);
    }
  };

  it('should append contents to the DOM by default', () => {
    clearDOM();
    const elem = React.createElement(renderer);
    const wrapper = mount(elem);

    expect(wrapper.find(Modal).length).to.eql(1);
    expect(APP_BASE.getElementsByClassName('rc-portal').length).to.eql(1);
  });

  it('should not append contents to the DOM when passed isOpened false', () => {
    clearDOM();
    const elem = React.createElement(renderer, { isOpened: false });
    const wrapper = mount(elem);

    expect(wrapper.find(Modal).length).to.eql(1);
    expect(APP_BASE.getElementsByClassName('rc-portal').length).to.eql(0);
  });

  it('should remove contents from DOM on unmount', () => {
    clearDOM();
    const elem = React.createElement(renderer);
    const wrapper = mount(elem);

    expect(APP_BASE.getElementsByClassName('rc-portal').length).to.eql(1);

    wrapper.unmount();

    expect(APP_BASE.getElementsByClassName('rc-portal').length).to.eql(0);
  });
});
