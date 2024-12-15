import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Checkbox from '../../source/react/library/checkbox/Checkbox';

describe('<Checkbox />', () => {
  jsdom({ skipWindowCheck: true });

  const requiredProps = {
    name: 'test-name',
    label: 'test-label',
  };

  it('propagates the provided className to the top level element', () => {
    expect(
      shallow(<Checkbox {...requiredProps} className="test-class" />),
    ).to.have.className('test-class');
  });

  it('propagates provided inline style to the top level element', () => {
    expect(
      shallow(<Checkbox {...requiredProps} style={{ marginTop: 10 }} />),
    ).to.have.style('margin-top', '10px');
  });

  it('should have an accessible ref method to the inner input element', async () => {
    const checkbox = await new Promise((resolve) => {
      mount(<Checkbox {...requiredProps} inputRef={resolve} />);
    });

    expect(checkbox.nodeName).to.equal('INPUT');
  });

  it('should respond to change if onChange is provided', () => {
    const onChange = sinon.spy();
    const wrapper = mount(<Checkbox {...requiredProps} onChange={onChange} />);

    wrapper.find('input').simulate('change');

    expect(onChange.called).to.equal(true);
  });

  it('should respond to focus if onFocus is provided', () => {
    const onFocus = sinon.spy();
    const wrapper = mount(<Checkbox {...requiredProps} onFocus={onFocus} />);

    wrapper.find('input').simulate('focus');

    expect(onFocus.called).to.equal(true);
  });

  it('should have className corresponding to a present error if provided', () => {
    expect(
      shallow(<Checkbox {...requiredProps} error />).find('input'),
    ).to.have.className('rc-checkbox-error');
  });

  it('should have an attribute corresponding to being disabled', () => {
    expect(shallow(<Checkbox {...requiredProps} disabled />).find('input'))
      .to.have.prop('disabled')
      .to.equal(true);
  });

  it('should have className corresponding to being indeterminate', () => {
    expect(
      shallow(<Checkbox {...requiredProps} indeterminate />).find('input'),
    ).to.have.className('rc-checkbox-indeterminate');
  });
});
