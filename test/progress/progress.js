import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Progress from '../../source/react/library/progress/Progress';

describe('<Progress />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render an svg', () => {
    const wrapper = shallow(<Progress />);

    expect(wrapper.find('svg')).to.have.length(1);
  });

  it('should render the correct number of steps', () => {
    const wrapper = shallow(<Progress steps={3} />);

    // 3 steps + an active step and active step shadow.
    expect(wrapper.find('.rc-progress-step')).to.have.length(5);
  });

  it('should render the correct number of lines', () => {
    const wrapper = shallow(<Progress steps={8} />);

    // Should render enough lines to connect the steps.
    expect(wrapper.find('.rc-progress-line')).to.have.length(7);
  });
});
