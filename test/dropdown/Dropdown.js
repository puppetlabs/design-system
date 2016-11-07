import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Dropdown from '../../source/react/library/dropdown/Dropdown';

describe('<Dropdown />', () => {
  jsdom();

  const options = [{
    id: 1,
    value: 'option 1',
  }, {
    id: 2,
    value: 'option 2',
  }, {
    id: 3,
    value: 'option 3',
  }];

  it('should render a dropdown menu', () => {
    const wrapper = shallow(<Dropdown selected={ 1 } options={ options } />);

    expect(wrapper.find('DropdownMenu').length).to.equal(1);
  });

  it('should render the correct label based off one selection', () => {
    const wrapper = mount(<Dropdown selected={ 1 } options={ options } />);

    expect(wrapper.find('.rc-dropdown-label').text()).to.equal('option 1');
  });

  it('should render the correct label based off two selections', () => {
    const wrapper = mount(<Dropdown selected={ [1, 2] } options={ options } />);

    expect(wrapper.find('.rc-dropdown-label').text()).to.equal('option 1 and option 2');
  });

  it('should render the correct label based off three selections', () => {
    const wrapper = mount(<Dropdown selected={ [1, 2, 3] } options={ options } />);

    expect(wrapper.find('.rc-dropdown-label').text()).to.equal('option 1, option 2, and option 3');
  });

  it('should render a label if its passed in rather than the selected options', () => {
    const wrapper = mount(<Dropdown label="I'm a label" selected={ [1, 2, 3] } options={ options } />);

    expect(wrapper.find('.rc-dropdown-label').text()).to.equal('I\'m a label');
  });
});
