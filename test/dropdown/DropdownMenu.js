import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import DropdownMenu from '../../source/react/library/dropdown/DropdownMenu';

describe('<DropdownMenu />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render a menu title', () => {
    const options = [
      { id: 1, value: 'option 1' },
      { id: 2, value: 'option 2' },
    ];
    const wrapper = mount(
      <DropdownMenu title="I love hints!" options={options} />,
    );

    expect(wrapper.find('.rc-menu-title').text()).to.equal('I love hints!');
  });

  it('should render a blank slate', () => {
    const options = [];
    const wrapper = shallow(
      <DropdownMenu blank="I love blank slates!" options={options} />,
    );

    expect(wrapper.find('.rc-dropdown-blank').text()).to.equal(
      'I love blank slates!',
    );
  });

  it('should render a popover', () => {
    const options = [
      { id: 1, value: 'option 1' },
      { id: 2, value: 'option 2' },
    ];
    const wrapper = shallow(<DropdownMenu options={options} />);

    expect(wrapper.find('Popover')).to.have.length(1);
  });

  it('should set the width of the popover', () => {
    const options = [
      { id: 1, value: 'option 1' },
      { id: 2, value: 'option 2' },
    ];
    const wrapper = shallow(<DropdownMenu width="200px" options={options} />);

    expect(wrapper.find('Popover').prop('width')).to.equal('200px');
  });

  it('should pass disablePortal to Popover', () => {
    const wrapper = shallow(<DropdownMenu disablePortal />);
    expect(wrapper.find('Popover').prop('disablePortal')).to.eql(true);
  });

  it('should pass the correct number of options to Menu', () => {
    const options = [
      { id: 1, value: 'option 1' },
      { id: 2, value: 'option 2' },
    ];
    const wrapper = shallow(<DropdownMenu options={options} />);
    expect(wrapper.find('MenuList').prop('options').length).to.eql(2);
  });

  it('should allow for width to be inheritd', () => {
    const options = [{ id: 1, value: 'inheritd' }];
    const wrapper = shallow(
      <DropdownMenu inheritWidth options={options} width="100px" />,
    );

    expect(wrapper.find('Popover').prop('inheritTargetWidth')).to.eql(true);
    expect(wrapper.find('Popover').prop('width')).to.not.eql('100px');
  });

  it('render applyLabel and fallback apply label text', () => {
    const defaultApplyLabel = 'Apply';
    const newApplyLabel = 'New apply label';
    const options = [
      { id: 1, value: 'option 1' },
      { id: 2, value: 'option 2' },
    ];
    const wrapperNoApplyLabel = shallow(
      <DropdownMenu multiple options={options} />,
    );
    expect(wrapperNoApplyLabel.find('Popover Button').prop('label')).to.equal(
      defaultApplyLabel,
    );

    const wrapperApplyLabel = shallow(
      <DropdownMenu multiple options={options} applyLabel="New apply label" />,
    );
    expect(wrapperApplyLabel.find('Popover Button').prop('label')).to.equal(
      newApplyLabel,
    );
  });
});
