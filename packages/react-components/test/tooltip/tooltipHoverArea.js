import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import TooltipHoverArea from '../../source/react/library/tooltips/TooltipHoverArea';

let sandbox;
let mockTooltip;

describe('<TooltipHoverArea />', () => {
  jsdom({ skipWindowCheck: true });

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Spy on createPortal to render within test, without root div
    mockTooltip = sandbox
      .stub(ReactDOM, 'createPortal')
      .callsFake(portal => portal);
  });

  afterEach(() => {
    sandbox.restore();
  });

  const defaultProps = {
    tooltip: <span className="tooltip">I'm the tooltip</span>,
    children: <span className="target">I'm the target</span>,
  };

  it('should render wrapper around children by default', () => {
    const wrapper = shallow(<TooltipHoverArea {...defaultProps} />);

    expect(wrapper.find('.rc-tooltip-reference')).to.have.length(1);
    expect(wrapper.find('.rc-tooltip')).to.have.length(1);
    expect(wrapper.find('.rc-tooltip').text()).to.eql("I'm the tooltip");
  });
});
