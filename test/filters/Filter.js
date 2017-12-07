import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Filter from '../../source/react/library/filters/Filter';

describe('<Filter />', () => {
  const defaultProps = {
    filter: { field: 'Name', op: '=', value: 'Steve' },
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<Filter { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });
});
