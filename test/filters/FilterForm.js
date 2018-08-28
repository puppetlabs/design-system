import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import FilterForm from '../../source/react/library/filters/FilterForm';

describe('<FilterForm />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<FilterForm />);

    expect(wrapper.length).to.eql(1);
  });

  describe('overriding overridable things', () => {
    it('should be able to override labels', () => {
      const filterStrings = {
        filterField: 'filterField custom label',
        filterOperator: 'filterOperator custom label',
        filterValue: 'filterValue custom label',
        filterRemovable: 'filterRemovable custom label',
      };
      const wrapper = shallow(
        <FilterForm
          strings={ filterStrings }
        />);

      expect(wrapper.find('FormField[name="filterField"]').prop('label')).to.eql('filterField custom label');
      expect(wrapper.find('FormField[name="filterOperator"]').prop('label')).to.eql('filterOperator custom label');
      expect(wrapper.find('FormField[name="filterValue"]').prop('label')).to.eql('filterValue custom label');
    });
  });

});
