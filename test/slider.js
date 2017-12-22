import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Slider from '../source/react/library/Slider';

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
});
