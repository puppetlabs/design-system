import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import BlankSlate from '../source/react/library/BlankSlate';

describe('<BlankSlate />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    const wrapper = shallow(<BlankSlate icon="fields" message="Hello!" />);

    expect(wrapper.length).to.eql(1);
  });
});
