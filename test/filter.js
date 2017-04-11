import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Filter from '../source/react/library/Filter';

describe('<Filter />', () => {
  jsdom();
  const noop = () => {};

  const defaultProps = {
    onDelete: noop,
    fields: ['mock'],
  };

  it('should render without blowing up', () => {
    const wrapper = shallow(<Filter { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });

  describe('when passed a filter', () => {
    const filter = { field: 'myField', op: '=', value: 'mockValue' };

    it('should render the field, op, and value for the filter', () => {
      const wrapper = shallow(<Filter { ...defaultProps } filter={ filter } />);

      expect(wrapper.find({ name: 'field-select' }).prop('value')).to.eql(filter.field);
      expect(wrapper.find({ name: 'operator-select' }).prop('value')).to.eql(filter.op);
      expect(wrapper.find('Input').prop('value')).to.eql(filter.value);
    });

    it('should respond to changes', () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Filter
          { ...defaultProps }
          filter={ filter }
          onChange={ onChange }
        />
      );

      wrapper.find('Input').simulate('change', {
        target: { value: 'mockValue2' },
      });

      expect(onChange.callCount).to.eql(1);
      expect(onChange.lastCall.args).to.eql([
        { field: 'myField', op: '=', value: 'mockValue2' },
      ]);
    });
  });
});
