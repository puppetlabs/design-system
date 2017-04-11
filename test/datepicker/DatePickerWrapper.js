import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import moment from 'moment';

import DatePickerWrapper from '../../source/react/library/datepicker/DatePickerWrapper';

describe('<DatePickerWrapper />', () => {
  jsdom();
  const noop = () => {};
  const range = moment.range('2017-01-01', '2017-01-06');
  const ranges = [
    { count: 1, unit: 'week' },
    { count: 1, unit: 'month' },
    { count: 1, unit: 'year' },
  ];

  it('should render without blowing up', () => {
    const wrapper = shallow(<DatePickerWrapper onChange={ noop } range={ range } />);

    expect(wrapper.length).to.equal(1);
  });

  it('should render the appropriate number of ranges when provided', () => {
    const wrapper = shallow(
      <DatePickerWrapper onChange={ noop } range={ range } ranges={ ranges } />
    );

    // the 4th range is custom
    expect(wrapper.find('.rc-ranges li').length).to.equal(4);
  });

  it('should fire the change event when the first range is clicked', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <DatePickerWrapper onChange={ onChange } range={ range } ranges={ ranges } />
    );

    wrapper.find('.rc-ranges li').first().simulate('click');
    expect(onChange.called).to.equal(true);
  });
});
