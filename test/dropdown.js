import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Dropdown from '../source/react/library/dropdown/Dropdown';

describe('<Dropdown />', () => {
  jsdom();

  it('should render the correct label', () => {
    const options = [{ id: 1, value: 'option 1' }, { id: 2, value: 'option 2' }];
    const wrapper = mount(<Dropdown selected={ 1 } options={ options } />);

    expect(wrapper.find('.rc-dropdown-label').text()).to.equal('option 1');
  });

  it('should render the correct label when multiple selections are allowed', () => {
    const options = [{ id: 1, value: 'option 1' }, { id: 2, value: 'option 2' }];
    const wrapper = mount(<Dropdown multiple selected={ [1, 2] } options={ options } />);

    expect(wrapper.find('.rc-dropdown-label').text()).to.equal('option 1, and option 2');
  });
});
