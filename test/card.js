import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Card from '../source/react/Card';

describe('<Card />', () => {
  jsdom();

  it('should respond to click events if onClick provided', () => {
    const wrapper = shallow(<Card />);
    const onClick = sinon.spy();
    wrapper.setProps({ onClick });
    wrapper.simulate('click', { preventDefault: () => {} });

    expect(onClick.called).to.equal(true);
  });

  it('should respond to remove link if onRemove provided', () => {
    const wrapper = shallow(<Card />);
    const onRemove = sinon.spy();
    wrapper.setProps({ onRemove });
    wrapper.find('.rui-card-remove').simulate('click', { preventDefault: () => {} });

    expect(onRemove.called).to.equal(true);
  });

  it('should accept a classname prop', () => {
    const wrapper = shallow(<Card />);
    wrapper.setProps({ className: 'cards-rule' });

    expect(wrapper.find('.cards-rule')).to.have.length(1);
  });

  it('should accept a selected prop', () => {
    const wrapper = shallow(<Card />);
    wrapper.setProps({ selected: true });

    expect(wrapper.find('.rui-card-selected')).to.have.length(1);
  });
});
