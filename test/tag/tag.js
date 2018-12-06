import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import Tag from '../../source/react/library/tag/Tag';

describe('<Tag />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render the children provided', () => {
    const wrapper = shallow(<Tag>hello world!</Tag>);

    expect(wrapper.text()).to.eql('hello world!');
  });

  it('should accept a tooltip prop and render a tooltip', () => {
    const wrapper = shallow(<Tag tooltip>hi!</Tag>);

    expect(wrapper.find('TooltipHoverArea').length).to.eql(1);
  });

  it('should respond to a click event', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Tag onClick={onClick} />);

    wrapper.simulate('click', { preventDefault() {} });

    expect(onClick.called).to.equal(true);
  });

  it('should respond to a separate, isolated onRemove click event', () => {
    const onClick = sinon.spy();
    const onRemove = sinon.spy();
    const wrapper = shallow(<Tag onClick={onClick} onRemove={onRemove} />);

    wrapper
      .find('.rc-tag-remove-button')
      .simulate('click', { preventDefault() {}, stopPropagation() {} });

    expect(onClick.called).to.equal(false);
    expect(onRemove.called).to.equal(true);
  });
});
