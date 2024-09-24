import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Switch from '../../source/react/library/switch/Switch';

describe('<Switch />', () => {
  jsdom({ skipWindowCheck: true });

  const requiredProps = {
    name: 'test-name',
    label: 'test-label',
  };

  it('propagates the provided className to the top level element', () => {
    expect(
      shallow(<Switch {...requiredProps} className="test-class" />),
    ).to.have.className('test-class');
  });

  it('propagates provided inline style to the top level element', () => {
    expect(
      shallow(<Switch {...requiredProps} style={{ marginTop: 10 }} />),
    ).to.have.style('margin-top', '10px');
  });

  it('should have an accessible ref method to the inner input element', async () => {
    const switchNode = await new Promise((resolve) => {
      mount(<Switch {...requiredProps} inputRef={resolve} />);
    });

    expect(switchNode.nodeName).to.equal('INPUT');
  });

  it('should respond to change if onChange is provided', () => {
    const onChange = sinon.spy();
    const wrapper = mount(<Switch {...requiredProps} onChange={onChange} />);

    wrapper.find('input').simulate('change');

    expect(onChange.called).to.equal(true);
  });

  it('should respond to focus if onFocus is provided', () => {
    const onFocus = sinon.spy();
    const wrapper = mount(<Switch {...requiredProps} onFocus={onFocus} />);

    wrapper.find('input').simulate('focus');

    expect(onFocus.called).to.equal(true);
  });

  it('should have className corresponding to a present error if provided', () => {
    expect(
      shallow(<Switch {...requiredProps} error />).find('.rc-switch-container'),
    ).to.have.className('rc-switch-error');
  });

  it('should have an attribute corresponding to being disabled', () => {
    expect(shallow(<Switch {...requiredProps} disabled />).find('input'))
      .to.have.prop('disabled')
      .to.equal(true);
  });
});
