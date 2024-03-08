import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Input, { SUPPORTED_TYPES } from '../../source/react/library/input/Input';

describe('<Input />', () => {
  jsdom({ skipWindowCheck: true });

  const requiredProps = {
    name: 'test-input',
  };

  it('propagates the provided className to the top level element', () => {
    expect(
      shallow(<Input {...requiredProps} className="test-class" />),
    ).to.have.className('test-class');
  });

  it('propagates provided inline style to the top level element', () => {
    expect(
      shallow(<Input {...requiredProps} style={{ marginTop: 10 }} />),
    ).to.have.style('margin-top', '10px');
  });

  it('renders an html input for supported html input types', () => {
    const htmlInputTypes = SUPPORTED_TYPES.filter(type => type !== 'multiline');

    const component = shallow(<Input {...requiredProps} />);

    htmlInputTypes.forEach(type => {
      component.setProps({ type });

      expect(component.find('input')).to.have.prop('type', type);
    });
  });

  it('renders a textarea for the multiline input type', () => {
    expect(
      shallow(<Input {...requiredProps} type="multiline" />),
    ).to.have.descendants('textarea');
  });

  it('uses text type by default', () => {
    expect(shallow(<Input {...requiredProps} />).find('input')).to.have.prop(
      'type',
      'text',
    );
  });

  it('propagates provided name to the inner input element', () => {
    expect(shallow(<Input {...requiredProps} />).find('input')).to.have.prop(
      'name',
      'test-input',
    );
  });

  it('Sets the input id equal to the provided name', () => {
    expect(shallow(<Input {...requiredProps} />).find('input')).to.have.prop(
      'id',
      'test-input',
    );
  });

  it('propagates all additional props to input element', () => {
    const extraProps = {
      onFocus() {},
      onInput() {},
    };

    expect(
      shallow(<Input {...requiredProps} {...extraProps} />).find('input'),
    ).to.have.props(extraProps);
  });

  it('should have an accessible ref method to the inner input element', async () => {
    const input = await new Promise(resolve => {
      mount(<Input {...requiredProps} inputRef={resolve} />);
    });

    expect(input.nodeName).to.equal('INPUT');
  });

  it('should have an accessible ref method to the inner input element', async () => {
    const input = await new Promise(resolve => {
      mount(<Input {...requiredProps} type="multiline" inputRef={resolve} />);
    });

    expect(input.nodeName).to.equal('TEXTAREA');
  });

  it('should respond to click events if onClick is provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Input {...requiredProps} onClick={onClick} />);

    wrapper.find('input').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should respond to change if onChange is provided', () => {
    const onChange = sinon.spy();
    const wrapper = mount(<Input {...requiredProps} onChange={onChange} />);

    wrapper.find('input').simulate('change');

    expect(onChange.called).to.equal(true);
  });

  it('should respond to focus if onFocus is provided', () => {
    const onFocus = sinon.spy();
    const wrapper = mount(<Input {...requiredProps} onFocus={onFocus} />);

    wrapper.find('input').simulate('focus');

    expect(onFocus.called).to.equal(true);
  });

  it('should have className corresponding to a present error if provided', () => {
    expect(
      shallow(<Input {...requiredProps} error />).find('input'),
    ).to.have.className('rc-input-error');
  });

  it('should have className corresponding to simple style if provided', () => {
    expect(
      shallow(<Input {...requiredProps} simple />).find('input'),
    ).to.have.className('rc-input-simple');
  });

  it('should respond to click events if trailingButtonIcon and onClickTrailingButton are provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Input {...requiredProps} trailingButtonIcon="eye" onClickTrailingButton={onClick} />);

    wrapper.find('button').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should respond to click events if trailingButtonText and onClickTrailingButton are provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Input {...requiredProps} trailingButtonText="Click me" onClickTrailingButton={onClick} />);

    wrapper.find('button').simulate('click');

    expect(onClick.called).to.equal(true);
  });

  it('should render the trailing icon button after the input element if trailingButtonIcon is provided', () => {
    const wrapper = shallow(<Input {...requiredProps} trailingButtonIcon="eye" /> );
    expect(wrapper.find('div').children().last().is('Button')).to.equal(true);
  }); 
});
