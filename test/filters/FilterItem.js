import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import FilterItem from '../../source/react/library/filters/FilterItem';

describe('<Filter />', () => {
  const defaultProps = {
    filter: { field: 'Name', op: '=', value: 'Steve' },
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<FilterItem { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });
});
