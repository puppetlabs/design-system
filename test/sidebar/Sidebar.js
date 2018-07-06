import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Sidebar from '../../source/react/library/sidebar/Sidebar';

describe('<Sidebar />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.length).to.eql(1);
  });

  it('should not provide a button to toggle modes by default', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.find('Button').length).to.eql(0);
  });

  it('should provide a button to toggle modes if prop provided', () => {
    const wrapper = shallow(<Sidebar togglable />);

    expect(wrapper.find('Button').length).to.eql(1);
  });

  it('should be full size by default', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.hasClass('rc-sidebar-minimized')).to.eql(false);
  });

  it('should have a minimized class if prop provided', () => {
    const wrapper = shallow(<Sidebar minimized />);

    expect(wrapper.hasClass('rc-sidebar-minimized')).to.eql(true);
  });

  it('should properly render provided children', () => {
    const wrapper = shallow(
      <Sidebar>
        <span className="test-child">hello!</span>
      </Sidebar>,
    );

    expect(wrapper.find('.test-child').length).to.eql(1);
  });
});
