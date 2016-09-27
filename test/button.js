import jsdom from 'mocha-jsdom';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Button from '../source/react/Button';

describe('<Button />', () => {
  jsdom();

  const wrapper = shallow(<Button />);

  it('should have disabled attr when passed disabled prop', () => {
    wrapper.setProps({ disabled: true });

    expect(wrapper).to.have.attr('disabled');
  });

  it('should not respond to click events when disabled', () => {
    const onClick = sinon.spy();
    wrapper.setProps({ disabled: true, onClick });
    wrapper.simulate('click', { preventDefault: () => { } });

    expect(onClick.called).to.be.false;
  });

  it('should respond to click events', () => {
    const onClick = sinon.spy();
    wrapper.setProps({ disabled: false, onClick });
    wrapper.simulate('click');

    expect(onClick.called).to.be.true;
  });
});
