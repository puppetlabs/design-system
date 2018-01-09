import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Filters from '../../source/react/library/filters/Filters';

describe('<Filters />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Filters />);

    expect(wrapper.length).to.eql(1);
  });

  describe('rendering existing filters', () => {
    it('should render a simple filter', () => {
      const filters = [{
        field: 'Name',
        op: '=',
        value: 'Steve',
      }];
      const fields = ['Name'];
      const wrapper = shallow(<Filters filters={ filters } fields={ fields } />);

      expect(wrapper.find('FilterItem').length).to.eql(1);
      expect(wrapper.find('FilterItem').prop('filter')).to.eql(filters[0]);
    });
  });

  describe('adding a filter', () => {
    it('should render a form after the add button is clicked', () => {
      const wrapper = shallow(<Filters />);
      expect(wrapper.find('Form').length).to.eql(0);

      wrapper.find('Button').simulate('click');

      expect(wrapper.find('Form').length).to.eql(1);
    });
  });
});
