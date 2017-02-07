import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Tooltip from '../../source/react/library/tooltips/Tooltip';

describe('<Tooltip />', () => {
  jsdom();

  const defaultProps = {
    target: <span>hi</span>,
  };

  xit('should render when given a target', () => {
    const wrapper = shallow(<Tooltip { ...defaultProps } />);

    expect(wrapper.find('.rc-tooltip')).to.have.length(1);
    expect(wrapper.find('.rc-tooltip').hasClass('rc-tooltip-position-right')).to.eql(true);
    expect(wrapper.find('.rc-tooltip-carat')).to.have.length(1);
  });

  xit('should render childern within tooltip', () => {
    const wrapper = shallow(
      <Tooltip { ...defaultProps }>
        <span className="child" />
      </Tooltip>
    );

    expect(wrapper.find('.child')).to.have.length(1);
  });
});
