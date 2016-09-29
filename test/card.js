import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Card from '../source/react/Card';

describe('<Card />', () => {
  jsdom();

  const wrapper = shallow(<Card />);

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    wrapper.setProps({ onClick });
    wrapper.simulate('click', { preventDefault: () => {} });

    expect(onClick.called).to.equal(true);
  });

  it('should respond to remove link if onRemove provided', () => {
    const onRemove = sinon.spy();
    wrapper.setProps({ onRemove });
    wrapper.find('.rui-card-remove').simulate('click', { preventDefault: () => {} });

    expect(onRemove.called).to.equal(true);
  });

  it('should accept a classname prop', () => {
    wrapper.setProps({ className: 'cards-rule' });

    expect(wrapper.find('.cards-rule')).to.have.length(1);
  });

  it('should accept a selected prop', () => {
    wrapper.setProps({ selected: true });

    expect(wrapper.find('.rui-card-selected')).to.have.length(1);
  });
});
