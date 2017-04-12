import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import List from '../../source/react/library/list/List';

describe('<List />', () => {
  jsdom();

  it('should render without blowing up', () => {
    const wrapper = shallow(<List />);

    expect(wrapper.length).to.eql(1);
  });
});
