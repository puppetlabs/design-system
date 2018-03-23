import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';

import BlankSlate from '../../source/react/library/blankSlate/BlankSlate';

const defaultProps = {
  image: '/path-to-image',
  title: 'My blankslate',
  lead: 'A blank slate about nothing',
  content: 'foo',
  note: 'bar',
};

describe('<BlankSlate />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render the old layout without blowing up', () => {
    const wrapper = shallow(<BlankSlate icon="fields" message="Hello!" />);

    expect(wrapper.length).to.eql(1);
  });

  it('should render the new layout without blowing up', () => {
    const wrapper = shallow(<BlankSlate { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should not render a button if no onClick provided', () => {
    const wrapper = mount(<BlankSlate { ...defaultProps } />);

    expect(wrapper.find('.rc-button').length).to.equal(0);
  });

  it('should render a button and respond to click events for button if onClick provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<BlankSlate { ...defaultProps } onClick={ onClick } />);

    wrapper.find('.rc-button').simulate('click');

    expect(onClick.called).to.equal(true);
  });
});
