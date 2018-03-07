import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Slider from '../../source/react/library/slider/Slider';
import { LEFT_KEY_CODE, RIGHT_KEY_CODE } from '../../source/react/constants';

describe('<Slider />', () => {
  jsdom({ skipWindowCheck: true });

  const defaultProps = {
    onChange: () => {},
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<Slider { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should render a slider handle', () => {
    const wrapper = shallow(<Slider { ...defaultProps } />);

    expect(wrapper.find('.rc-slider-handle').length).to.eql(1);
  });

  it('should render a slider bar', () => {
    const wrapper = shallow(<Slider { ...defaultProps } />);

    expect(wrapper.find('.rc-slider-bar').length).to.eql(1);
  });

  it('should render a slider bar that indicates what value is active', () => {
    const wrapper = shallow(<Slider { ...defaultProps } />);

    expect(wrapper.find('.rc-slider-bar-active').length).to.eql(1);
  });

  it('should increase the value when pressing the right arrow button on a keyboard', () => {
    const wrapper = shallow(<Slider { ...defaultProps } />);

    expect(wrapper.state('value')).to.eql(0);

    wrapper.simulate('keydown', { keyCode: RIGHT_KEY_CODE });

    expect(wrapper.state('value')).to.eql(1);
  });

  it('should decrease the value when pressing the left arrow button on a keyboard', () => {
    const wrapper = shallow(<Slider { ...defaultProps } defaultValue={ 2 } />);

    expect(wrapper.state('value')).to.eql(2);

    wrapper.simulate('keydown', { keyCode: LEFT_KEY_CODE });

    expect(wrapper.state('value')).to.eql(1);
  });
});
