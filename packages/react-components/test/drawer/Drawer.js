import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React, { useState } from 'react';
import sinon from 'sinon';

import Drawer from '../../source/react/library/drawer/Drawer';

describe('<Drawer/>', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Drawer />);

    expect(wrapper.length).to.eql(1);
  });

  it('should toggle when user clicks button', () => {
    const wrapper = shallow(<Drawer />);
    const toggleButton = wrapper.find('Button');

    expect(toggleButton.text()).to.equal('Details');
    toggleButton.simulate('click');

    expect(wrapper.find('Button').text()).to.equal('Hide details');
    expect(wrapper.find('div.rc-drawer-body')).to.have.length(1);
  });

  it('should show custom values when props provided', () => {
    const header = (
      <h3 as="h3" color="subtle">
        Here is where I make you aware that theres more content to see{' '}
      </h3>
    );
    const showMore = 'Show More Content';
    const showLess = 'Show Less Content';
    const buttonType = 'text';

    const wrapper = shallow(
      <Drawer
        headerContent={header}
        buttonTextOpen={showLess}
        buttonTextClosed={showMore}
        buttonType={buttonType}
      >
        <h4>This is the body content</h4>
      </Drawer>,
    );

    expect(wrapper.find('Button').text()).to.equal(showMore);
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('Button').text()).to.equal(showLess);

    console.log(wrapper.debug());
    expect(wrapper.find('div.rc-drawer-header-content').text()).to.equal(
      'Here is where I make you aware that theres more content to see ',
    );
    expect(wrapper.find('div.rc-drawer-body').text()).to.equal(
      'This is the body content',
    );
  });

  it('should repond to being controlled', () => {
    const wrapper = shallow(<Drawer defaultOpen={true} />);
    expect(wrapper.find('Button').text()).to.equal('Hide details');

    const wrapper2 = shallow(<Drawer defaultOpen={true} open={false} />);
    expect(wrapper2.find('Button').text()).to.equal('Details');

    const open = false;

    const toggle = sinon.spy();

    const wrapper3 = shallow(
      <Drawer
        defaultOpen={true}
        open={false}
        open={open}
        buttonToggle={toggle}
      />,
    );
    expect(wrapper3.find('Button').text()).to.equal('Details');
    const toggleButton = wrapper3.find('Button');
    toggleButton.simulate('click');
    expect(toggle).to.have.been.called;
  });
});
