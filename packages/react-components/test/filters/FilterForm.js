import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import FilterForm from '../../source/react/library/filters/FilterForm';

describe('<FilterForm />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<FilterForm />);

    expect(wrapper.length).to.eql(1);
  });

  it('should render an enabled "add" button by default', () => {
    const wrapper = mount(<FilterForm />);
    const button = wrapper.find('Button').at(1);

    expect(button.prop('disabled')).to.eql(false);
    expect(button.prop('children')).to.eql('Add');
  });

  it('should render an "update" cta if filter prop is passed in', () => {
    const filter = { 0: 'foo', 1: 'bar' };
    const wrapper = mount(<FilterForm filter={filter} />);
    const button = wrapper.find('Button').at(1);

    expect(button.prop('disabled')).to.eql(false);
    expect(button.prop('children')).to.eql('Update');
  });

  describe('overriding overridable things', () => {
    it('should be able to override labels', () => {
      const filterStrings = {
        ...FilterForm.defaultProps.strings,
        filterField: 'filterField custom label',
        filterOperator: 'filterOperator custom label',
        filterValue: 'filterValue custom label',
        filterRemovable: 'filterRemovable custom label',
      };
      const wrapper = shallow(<FilterForm strings={filterStrings} />);

      expect(wrapper.find('FormField[name="field"]').prop('label')).to.eql(
        'filterField custom label',
      );
      expect(wrapper.find('FormField[name="op"]').prop('label')).to.eql(
        'filterOperator custom label',
      );
      expect(wrapper.find('FormField[name="value"]').prop('label')).to.eql(
        'filterValue custom label',
      );
    });
  });
});
