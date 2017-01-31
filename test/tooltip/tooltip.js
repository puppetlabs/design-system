import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Tooltip from '../../source/react/library/tooltip/Tooltip';

describe('<Tooltip />', () => {
  jsdom();

  const defaultProps = {
    target: <span>hi</span>,
  };

  it('should render when given a target', () => {
    const wrapper = shallow(<Tooltip { ...defaultProps } />);

    expect(wrapper.find('.rc-tooltip')).to.have.length(1);
    expect(wrapper.find('.rc-tooltip').hasClass('position-right')).to.eql(true);
    expect(wrapper.find('.tooltip-carat')).to.have.length(1);
  });

  it('should render childern within tooltip', () => {
    const wrapper = shallow(
      <Tooltip { ...defaultProps }>
        <span className="child" />
      </Tooltip>
    );

    expect(wrapper.find('.child')).to.have.length(1);
  });
});
