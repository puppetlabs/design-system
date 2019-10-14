import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Sidebar from '../../source/react/library/sidebar/Sidebar';

describe('<Sidebar />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.length).to.eql(1);
  });

  it('should be full size by default', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.hasClass('rc-sidebar-minimized')).to.eql(false);
  });

  it('should have a minimized class if prop provided', () => {
    const wrapper = shallow(<Sidebar minimized />);

    expect(wrapper.hasClass('rc-sidebar-minimized')).to.eql(true);
  });

  describe('<Sidebar.Header />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(<Sidebar.Header ariaLabel="Test label" />);

      expect(wrapper.length).to.eql(1);
    });
  });

  describe('<Sidebar.Navigation />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(
        <Sidebar.Navigation>Hello world</Sidebar.Navigation>,
      );

      expect(wrapper.length).to.eql(1);
    });
  });

  describe('<Sidebar.Section />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(<Sidebar.Section />);

      expect(wrapper.length).to.eql(1);
    });

    it('should render a label when prop is provided', () => {
      const wrapper = shallow(<Sidebar.Section label="test" />);

      expect(wrapper.find('.rc-sidebar-label').length).to.eql(1);
    });
  });

  describe('<Sidebar.Item />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(<Sidebar.Item title="test" />);

      expect(wrapper.length).to.eql(1);
    });

    it('should render an icon when the prop is provided ', () => {
      const wrapper = shallow(<Sidebar.Item title="test" icon="profile" />);

      expect(wrapper.find('Icon').length).to.eql(1);
    });

    it('should render an icon when the prop is provided ', () => {
      const wrapper = shallow(<Sidebar.Item title="test" icon="profile" />);

      expect(wrapper.find('Icon').length).to.eql(1);
    });

    it('should render as a different element when the prop is provided ', () => {
      const wrapper = shallow(<Sidebar.Item title="test" as="a" />);
      expect(wrapper.find('.rc-sidebar-item-link').type()).to.eql('a');
    });
  });

  describe('<Sidebar.Footer />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(<Sidebar.Footer />);

      expect(wrapper.length).to.eql(1);
    });
  });
});
