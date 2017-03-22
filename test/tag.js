import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Tag from '../source/react/library/Tag';

describe('<Tag />', () => {
  jsdom();

  it('should render the children provided', () => {
    const wrapper = shallow(<Tag>hello world!</Tag>);

    expect(wrapper.text()).to.eql('hello world!');
  });

  it('should accept a tooltip prop and render a tooltip', () => {
    const wrapper = shallow(<Tag tooltip>hi!</Tag>);

    expect(wrapper.find('TooltipHoverArea').length).to.eql(1);
  });
});
