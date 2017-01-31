import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import DropdownMenu from '../../source/react/library/dropdown/DropdownMenu';

describe('<DropdownMenu />', () => {
  jsdom();

  it('should render the correct number of menu items', () => {
    const options = [{ id: 1, value: 'option 1' }, { id: 2, value: 'option 2' }];
    const wrapper = shallow(<DropdownMenu options={ options } />);

    expect(wrapper.find('DropdownMenuItem')).to.have.length(2);
  });

  it('should render a hint', () => {
    const options = [{ id: 1, value: 'option 1' }, { id: 2, value: 'option 2' }];
    const wrapper = shallow(<DropdownMenu hint="I love hints!" options={ options } />);

    expect(wrapper.find('.rc-dropdown-hint').text()).to.equal('I love hints!');
  });

  it('should render a blank slate', () => {
    const options = [];
    const wrapper = shallow(<DropdownMenu blank="I love blank slates!" options={ options } />);

    expect(wrapper.find('.rc-dropdown-blank').text()).to.equal('I love blank slates!');
  });

  it('should render a popover', () => {
    const options = [{ id: 1, value: 'option 1' }, { id: 2, value: 'option 2' }];
    const wrapper = shallow(<DropdownMenu options={ options } />);

    expect(wrapper.find('Popover')).to.have.length(1);
  });

  it('should fire onChange callback when an item is clicked', () => {
    const options = [{ id: 1, value: 'option 1' }];
    const onChange = sinon.spy();
    const wrapper = shallow(<DropdownMenu options={ options } onChange={ onChange } />);

    // We manually call the onClick prop passed to DropdownMenuItem
    wrapper.find('DropdownMenuItem').props().onClick(options[0]);

    expect(onChange.calledOnce).to.eql(true);
    expect(onChange.lastCall.args[0]).to.eql(options[0]);
  });

  it('should set the width of the popover', () => {
    const options = [{ id: 1, value: 'option 1' }, { id: 2, value: 'option 2' }];
    const wrapper = shallow(<DropdownMenu width="200px" options={ options } />);

    expect(wrapper.find('Popover').prop('width')).to.equal('200px');
  });

  it('should pass disablePortal to Popover', () => {
    const wrapper = shallow(<DropdownMenu disablePortal />);

    expect(wrapper.find('Popover').prop('disablePortal')).to.eql(true);
  });
});
