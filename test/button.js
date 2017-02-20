import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Button from '../source/react/library/Button';

describe('<Button />', () => {
  jsdom();

  it('should have disabled attr when passed disabled prop', () => {
    const wrapper = shallow(<Button disabled />);

    expect(wrapper).to.have.attr('disabled');
  });

  it('should not respond to click events when disabled', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Button disabled onClick={ onClick } />);
    wrapper.simulate('click', { preventDefault: () => { } });

    expect(onClick.called).to.equal(false);
  });

  it('should respond to click events', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Button onClick={ onClick } />);
    wrapper.simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should have a processing indicator when enabled', () => {
    const wrapper = shallow(<Button processing />);
    const Icon = wrapper.find('Icon');

    expect(Icon.prop('type')).to.equal('loader');
  });

  it('should render an icon when provided', () => {
    const wrapper = shallow(<Button icon="plus" />);
    const Icon = wrapper.find('Icon');

    expect(Icon.prop('type')).to.equal('plus');
  });

  describe('button with badge', () => {
    it('should render within container', () => {
      const wrapper = shallow(<Button badge icon="plus" />);
      const container = wrapper.find('.rc-button-badge-container');

      expect(container.length).to.eql(1);
      expect(container.find('.rc-button').length).to.eql(1);
      expect(container.find('.rc-button-badge').length).to.eql(1);
    });

    it('should not render badge if button is disabled', () => {
      const wrapper = shallow(<Button badge disabled icon="plus" />);
      const container = wrapper.find('.rc-button-badge-container');

      expect(container.length).to.eql(0);
    });
  });
});
