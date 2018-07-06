import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Subsection from '../../source/react/library/sidebar/Subsection';
import SubsectionItem from '../../source/react/library/sidebar/SubsectionItem';

describe('<Subsection />', () => {
  const getProps = (newProps = {}) => {
    const defaultProps = {
      title: 'foo',
    };

    return Object.assign(defaultProps, newProps);
  };

  it('should render without blowing up', () => {
    const props = getProps();
    const wrapper = shallow(<Subsection { ...props } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should respond to click events if onAddItem provided', () => {
    const onAddItem = sinon.spy();
    const props = getProps({ onAddItem });
    const wrapper = mount(<Subsection { ...props } />);

    wrapper.find('Button').simulate('click');

    expect(onAddItem.called).to.equal(true);
  });

  it('should properly render provided children', () => {
    const wrapper = shallow(
      <Subsection>
        <span className="test-child">hello!</span>
      </Subsection>,
    );

    expect(wrapper.find('.test-child').length).to.eql(1);
  });

  it('should display all children by default', () => {
    const wrapper = shallow(
      <Subsection>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
      </Subsection>,
    );

    expect(wrapper.find('.test-child').length).to.eql(5);
  });

  it('should truncate the list of children if prop is provided', () => {
    const newProp = { truncate: true };
    const props = getProps(newProp);
    const wrapper = shallow(
      <Subsection { ...props }>
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
    const newProp = { truncate: true };
    const props = getProps(newProp);
    const wrapper = shallow(
      <Subsection { ...props }>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
        <span className="test-child">hello!</span>
      </Subsection>,
    );

    expect(wrapper.find('.rc-sidebar-view-more-link').length).to.eql(1);
  });

  // Using SubsectionItem component here b/c click simulation requires mounting
  // and span can't receive non-standard props from Subsection
  it('should expand list if view all link is clicked', () => {
    const newProp = { truncate: true };
    const props = getProps(newProp);
    const wrapper = mount(
      <Subsection { ...props }>
        <SubsectionItem />
        <SubsectionItem />
        <SubsectionItem />
        <SubsectionItem />
        <SubsectionItem />
      </Subsection>,
    );

    wrapper.find('.rc-sidebar-view-more-link').simulate('click');

    expect(wrapper.find('.rc-sidebar-view-more-link').length).to.eql(0);
    expect(wrapper.find('SubsectionItem').length).to.eql(5);
  });
});
