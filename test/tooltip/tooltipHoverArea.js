import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import TooltipHoverArea from '../../source/react/library/tooltips/TooltipHoverArea';

describe('<TooltipHoverArea />', () => {
  jsdom({ skipWindowCheck: true });

  const defaultProps = {
    tooltip: <span className="tooltip">I'm the tooltip</span>,
    children: <span className="target">I'm the target</span>,
  };

  it('should just render wrapper around children by default', () => {
    const wrapper = shallow(<TooltipHoverArea { ...defaultProps } />);

    expect(wrapper.find('.target')).to.have.length(1);
    expect(wrapper.find('.tooltip')).to.have.length(0);
  });

  xit('should render tooltip when open', () => {
    const wrapper = mount(<TooltipHoverArea { ...defaultProps } />);
    wrapper.setState({ open: true });

    expect(wrapper.find('.target')).to.have.length(1);
    expect(wrapper.find('.tooltip')).to.have.length(1);
  });
});
