import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import MenuList from '../../source/react/library/menu/MenuList';

describe('<MenuList />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render the correct number of menu items', () => {
    const options = [{ id: 1, value: 'option 1' }, { id: 2, value: 'option 2' }];
    const wrapper = shallow(<MenuList options={ options } />);

    expect(wrapper.find('MenuItem')).to.have.length(2);
  });

  it('should fire onChange callback when an item is clicked', () => {
    const options = [{ id: 1, value: 'option 1' }];
    const onChange = sinon.spy();
    const wrapper = shallow(<MenuList options={ options } onChange={ onChange } />);

    // We manually call the onClick prop passed to MenuItem
    wrapper.find('MenuItem').props().onClick(options[0]);

    expect(onChange.calledOnce).to.eql(true);
    expect(onChange.lastCall.args[0]).to.eql(options[0]);
  });
});
