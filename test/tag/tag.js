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

    expect(wrapper.find('.rc-tag-main-content').text()).to.eql('hello world!');
  });

  it('should respond to a click event', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Tag clickable onClick={onClick} />);

    wrapper
      .find('.rc-tag-main-content')
      .simulate('click', { preventDefault() {} });

    expect(onClick.called).to.equal(true);
  });

  it('should respond to a separate, isolated onRemove click event', () => {
    const onClick = sinon.spy();
    const onRemove = sinon.spy();
    const wrapper = shallow(
      <Tag clickable onClick={onClick} onRemove={onRemove} />,
    );

    wrapper
      .find('.rc-tag-remove-button')
      .simulate('click', { preventDefault() {}, stopPropagation() {} });

    expect(onClick.called).to.equal(false);
    expect(onRemove.called).to.equal(true);
  });

  it('should have a disabled class if disabled', () => {
    const wrapper = shallow(<Tag />);

    expect(wrapper.hasClass('rc-tag-disabled')).to.equal(false);

    wrapper.setProps({ disabled: true });

    expect(wrapper.hasClass('rc-tag-disabled')).to.equal(true);
  });
});
