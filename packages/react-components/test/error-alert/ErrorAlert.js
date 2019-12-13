import jsdom from 'mocha-jsdom';
import { mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ErrorAlert from '../../source/react/library/error-alert/ErrorAlert';

describe('<ErrorAlert />', () => {
  jsdom({ skipWindowCheck: true });

  it('renders string error', () => {
    const wrapper = mount(<ErrorAlert error="stranger danger" />);

    expect(wrapper).to.have.text('stranger danger');
  });

  it('renders Error instance message', () => {
    const wrapper = mount(<ErrorAlert error={new Error('stranger danger')} />);

    expect(wrapper).to.have.text('stranger danger');
  });

  it('renders a list of causes, filtered to include only those with no sensitivity', () => {
    const error = {
      message: 'testy',
      causes: [
        { message: 'test1', sensitivity: 100 },
        { message: 'test2', sensitivity: 0 },
      ],
    };

    const wrapper = mount(<ErrorAlert error={error} />);

    expect(wrapper)
      .to.have.exactly(1)
      .descendants('li');

    expect(wrapper.find('li')).to.have.text('test2');
  });
});
