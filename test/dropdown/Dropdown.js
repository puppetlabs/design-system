import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Dropdown from '../../source/react/library/dropdown/Dropdown';

describe('<Dropdown />', () => {
  jsdom();

  it('should render a dropdown menu', () => {
    const options = [{ id: 1, value: 'option 1' }, { id: 2, value: 'option 2' }];
    const wrapper = shallow(<Dropdown selected={ 1 } options={ options } />);

    expect(wrapper.find('DropdownMenu').length).to.equal(1);
  });
});
