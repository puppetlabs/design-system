import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Time from '../../source/react/library/time/Time';

describe('<Time />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    const time = `2020-05-01T15:37:45.1429698Z`;
    shallow(<Time>{time}</Time>);
  });

  it('should render a time element', () => {
    const time = `2020-05-01T15:37:45.1429698Z`;
    const wrapper = shallow(
      <Time
        year="numeric"
        month="long"
        day="numeric"
        hour="numeric"
        minute="numeric"
        second="numeric"
      >
        {time}
      </Time>,
    );
    expect(wrapper.type()).to.be.equal('time');

    expect(wrapper.debug()).to.be.equal(
      `<time datetime="2020-05-01T15:37:45.142Z">\n  May 1, 2020, 3:37:45 PM\n</time>`,
    );
  });
});
