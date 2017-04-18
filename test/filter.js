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

  describe('when creating a new filter', () => {
    it('shouldn\'t respond to change events until value is changed', () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Filter
          { ...defaultProps }
          onChange={ onChange }
        />
      );

      wrapper.find({ name: 'field-select' }).simulate('change', 'mockField1');

      expect(onChange.callCount).to.eql(0);

      wrapper.find({ name: 'operator-select' }).simulate('change', 'mockOp1');

      expect(onChange.callCount).to.eql(0);

      wrapper.find('Input').simulate('change', {
        target: { value: 'mockValue1' },
      });

      expect(onChange.callCount).to.eql(0);

      wrapper.find('Input').simulate('blur');

      expect(onChange.callCount).to.eql(1);

      expect(onChange.lastCall.args).to.eql([
        { field: 'mockField1', op: 'mockOp1', value: 'mockValue1' },
      ]);
    });

    it('should respond to op change when the op has no value', () => {
      const onChange = sinon.spy();
      const operators = [{ symbol: 'null', label: 'Is null', noValue: true }];
      const wrapper = shallow(
        <Filter
          { ...defaultProps }
          onChange={ onChange }
          operators={ operators }
        />
      );

      wrapper.find({ name: 'field-select' }).simulate('change', 'mockField1');

      expect(onChange.callCount).to.eql(0);

      wrapper.find({ name: 'operator-select' }).simulate('change', 'null');

      expect(onChange.callCount).to.eql(1);

      expect(onChange.lastCall.args).to.eql([
        { field: 'mockField1', op: 'null', value: '' },
      ]);
    });
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

    it('should clear value when changing to a valueless op', () => {
      const onChange = sinon.spy();
      const operators = [{ symbol: 'notNull', label: 'Is null', noValue: true }];
      const wrapper = shallow(
        <Filter
          { ...defaultProps }
          onChange={ onChange }
          filter={ filter }
          operators={ operators }
        />
      );

      wrapper.find({ name: 'operator-select' }).simulate('change', 'notNull');

      expect(onChange.callCount).to.eql(1);

      expect(onChange.lastCall.args).to.eql([
        { field: 'myField', op: 'notNull', value: '' },
      ]);
    });
  });
});
