import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import DropdownMenuItem from '../../source/react/library/dropdown/DropdownMenuItem';

describe('<DropdownMenuItem />', () => {
  jsdom();

  it('should render an item with the correct text', () => {
    const option = { id: 1, value: 'option 1' };
    const wrapper = shallow(<DropdownMenuItem option={ option } />);

    expect(wrapper.text()).to.equal('option 1');
  });

  it('should be marked as selected', () => {
    const option = { id: 1, value: 'option 1' };
    const wrapper = shallow(<DropdownMenuItem selected option={ option } />);

    expect(wrapper.find('li').hasClass('rc-dropdown-item-selected'));
    expect(wrapper.find('Icon')).to.have.length(0);
  });

  it('should be marked as selected and have a checkmark when multiple is provided', () => {
    const option = { id: 1, value: 'option 1' };
    const wrapper = shallow(<DropdownMenuItem selected multiple option={ option } />);

    expect(wrapper.find('li').hasClass('rc-dropdown-item-selected'));
    expect(wrapper.find('Icon')).to.have.length(1);
  });

  it('respond to click events', () => {
    const onClick = sinon.spy();
    const option = { id: 1, value: 'option 1' };
    const wrapper = shallow(<DropdownMenuItem onClick={ onClick } option={ option } />);
    wrapper.find('a').simulate('click', { preventDefault: () => { } });

    expect(onClick.called).to.equal(true);
  });

  it('not respond to click events when disabled', () => {
    const onClick = sinon.spy();
    const option = { id: 1, value: 'option 1', disabled: true };
    const wrapper = shallow(<DropdownMenuItem onClick={ onClick } option={ option } />);
    wrapper.find('a').simulate('click', { preventDefault: () => { } });

    expect(onClick.called).to.equal(false);
  });
});
