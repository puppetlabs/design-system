import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Subsection from '../../source/react/library/sidebar/Subsection';

describe('<Subsection />', () => {
  const defaultProps = {
    title: 'foo',
    selected: true,
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<Subsection {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
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

    expect(wrapper.find('.rc-sidebar-view-more-item').length).to.eql(1);
  });
});
