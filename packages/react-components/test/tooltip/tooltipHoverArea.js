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

  it('should render wrapper around children by default', () => {
    const wrapper = shallow(<TooltipHoverArea {...defaultProps} />);

    expect(wrapper.find('.rc-tooltip-container')).to.have.length(1);
    expect(wrapper.find('.rc-tooltip')).to.have.length(1);
  });

  it('should not wrap children when enabled is false', () => {
    const wrapper = mount(
      <TooltipHoverArea {...defaultProps} enabled={false} />,
    );

    expect(wrapper.find('.rc-tooltip-container')).to.have.length(0);
    expect(wrapper.find('.rc-tooltip')).to.have.length(0);
  });
});
