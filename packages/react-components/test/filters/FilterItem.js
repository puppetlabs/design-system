import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import FilterItem from '../../source/react/library/filters/FilterItem';

describe('<Filter />', () => {
  const defaultProps = {
    filter: { field: 'Name', op: '=', value: 'Steve' },
  };
  const customOperators = [
    { symbol: '=', label: 'Equals', sentence: 'is a custom equal to' },
    {
      symbol: 'notNull',
      label: 'Is not null',
      noValue: true,
      sentence: 'is a custom not null',
    },
  ];

  it('should render without blowing up', () => {
    const wrapper = shallow(<FilterItem {...defaultProps} />);

    expect(wrapper.length).to.eql(1);
  });

  it('should render bad filters without blowing up', () => {
    const badFilter = { field: 'Name', op: 'doesNotExist', value: 'Steve' };
    const wrapper = shallow(<FilterItem filter={badFilter} />);

    expect(wrapper.length).to.eql(1);
  });

  describe('Rendering custom operators', () => {
    it('should handle custom operators without blowing up', () => {
      const wrapper = shallow(
        <FilterItem operators={customOperators} {...defaultProps} />,
      );

      expect(wrapper.length).to.eql(1);
    });

    it('custom operators should give different sentences', () => {
      const wrapper = shallow(
        <FilterItem operators={customOperators} {...defaultProps} />,
      );

      expect(
        wrapper.find('span[className="rc-filter-field-op"]').text(),
      ).to.eql('is a custom equal to');
    });

    it('custom operators can have custom operations', () => {
      const filter = { field: 'Name', op: 'notNull' };
      const wrapper = shallow(
        <FilterItem operators={customOperators} filter={filter} />,
      );

      expect(
        wrapper.find('span[className="rc-filter-field-op"]').text(),
      ).to.eql('is a custom not null');
    });
  });
});
