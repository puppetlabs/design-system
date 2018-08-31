import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Subsection from '../../source/react/library/sidebar/Subsection';
import SubsectionItem from '../../source/react/library/sidebar/SubsectionItem';

describe('<Subsection />', () => {
  const defaultProps = {
    title: 'foo',
    selected: true,
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<Subsection {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
  });

  it('should respond to click events if onAddItem provided', () => {
    const onAddItem = sinon.spy();
    const wrapper = mount(
      <Subsection {...defaultProps} onAddItem={onAddItem} />,
    );

    wrapper.find('Button').simulate('click');

    expect(onAddItem.called).to.equal(true);
  });

  it('should properly render provided children', () => {
    const wrapper = shallow(
      <Subsection {...defaultProps}>
        <span className="test-child">hello!</span>
      </Subsection>,
    );

    expect(wrapper.find('.test-child').length).to.eql(1);
  });

  it('should display all children by default', () => {
    const wrapper = shallow(
      <Subsection {...defaultProps}>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
      </Subsection>,
    );

    expect(wrapper.find('.test-child').length).to.eql(5);
  });

  it('should not render children when not selected', () => {
    const wrapper = shallow(
      <Subsection {...defaultProps} selected={false}>
        <span className="test-child">hello!</span>
      </Subsection>,
    );

    expect(wrapper.find('.test-child').length).to.eql(0);
  });

  it('should truncate the list of children if prop is provided', () => {
    const wrapper = shallow(
      <Subsection {...defaultProps} truncate>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
      </Subsection>,
    );

    expect(wrapper.find('.test-child').length).to.eql(3);
  });

  it('should provide a view all link if list is truncated', () => {
    const wrapper = shallow(
      <Subsection {...defaultProps} truncate>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
      </Subsection>,
    );

    expect(wrapper.find('.rc-sidebar-subsection-view-more-link').length).to.eql(
      1,
    );
  });

  // Using SubsectionItem component here b/c click simulation requires mounting
  // and span can't receive non-standard props from Subsection
  it('should expand list if view all link is clicked', () => {
    const wrapper = mount(
      <Subsection {...defaultProps} truncate>
        <SubsectionItem />
        <SubsectionItem />
        <SubsectionItem />
        <SubsectionItem />
        <SubsectionItem />
      </Subsection>,
    );

    wrapper.find('.rc-sidebar-subsection-view-more-link').simulate('click');

    expect(wrapper.find('.rc-sidebar-subsection-view-more-link').length).to.eql(
      0,
    );
    expect(wrapper.find('SubsectionItem').length).to.eql(5);
  });
});
