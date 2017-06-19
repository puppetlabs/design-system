import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Card from '../../source/react/library/card/Card';

describe('<Card />', () => {
  jsdom({ skipWindowCheck: true });

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Card onClick={ onClick } />);

    wrapper.simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should accept a classname prop', () => {
    const wrapper = shallow(<Card className="cards-rule" />);

    expect(wrapper.hasClass('cards-rule'));
  });

  it('should accept a selected prop', () => {
    const wrapper = shallow(<Card selected />);

    expect(wrapper.hasClass('rc-card-selected'));
  });

  it('should properly render provided children', () => {
    const wrapper = shallow(
      <Card>
        <span className="test-child">hello!</span>
      </Card>
    );

    expect(wrapper.find('.test-child').length).to.eql(1);
  });
});
