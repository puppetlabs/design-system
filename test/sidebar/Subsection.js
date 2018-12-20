import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import { SIDEBAR_SUBSECTION_TRUNC_LENGTH } from '../../source/react/constants';

import Subsection from '../../source/react/library/sidebar/Subsection';

const items = [];
for (let i = 0; i < 10; i += 1) {
  const item = (
    <span className="test-child" key={i}>
      hello!
    </span>
  );
  items.push(item);
}

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
    const wrapper = shallow(<Subsection {...defaultProps}>{items}</Subsection>);

    expect(wrapper.find('.test-child').length).to.eql(10);
  });

  it('should truncate the list of children if prop is provided', () => {
    const wrapper = shallow(
      <Subsection truncate {...defaultProps}>
        {items}
      </Subsection>,
    );

    expect(wrapper.find('.test-child').length).to.eql(
      SIDEBAR_SUBSECTION_TRUNC_LENGTH,
    );
  });

  it('should provide a view all link if list is truncated', () => {
    const wrapper = shallow(
      <Subsection truncate {...defaultProps}>
        {items}
      </Subsection>,
    );

    expect(wrapper.find('.rc-sidebar-view-more-item').length).to.eql(1);
  });
});
