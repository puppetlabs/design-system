import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ConfirmationModal from '../../source/react/library/modals/ConfirmationModal';

describe.only('<ConfirmationModal />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render a modal', () => {
    const wrapper = mount(
      <ConfirmationModal
        title="Delete report?"
        confirmationMessage="Are you sure?"
      />,
    );

    expect(wrapper.find('.rc-modal').length).to.equal(1);
  });

  it('should render two buttons for confirm and cancel', () => {
    const wrapper = mount(
      <ConfirmationModal
        title="Delete report?"
        confirmationMessage="Are you sure?"
      />,
    );

    expect(wrapper.find('Button').length).to.equal(2);
  });

  it('should allow the confirm and cancel button labels to be overridden', () => {
    const wrapper = mount(
      <ConfirmationModal
        title="Delete report?"
        confirmationMessage="Are you sure?"
        strings={{ confirm: 'Yup', cancel: 'Nope' }}
      />,
    );

    expect(
      wrapper
        .find('Button')
        .at(0)
        .prop('label'),
    ).to.equal('Yup');

    expect(
      wrapper
        .find('Button')
        .at(1)
        .prop('label'),
    ).to.equal('Nope');
  });
});
