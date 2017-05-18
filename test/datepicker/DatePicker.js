import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import DatePicker from '../../source/react/library/datepicker/DatePicker';

// Importing this as a way of finding the relevant child components.
import DatePickerWrapper from '../../source/react/library/datepicker/DatePickerWrapper';

describe('<DatePicker />', () => {
  jsdom({skipWindowCheck: true});

  const fireMouseUp = () => {
    const event = document.createEvent('MouseEvents');
    event.initEvent('mouseup', true, true);
    document.dispatchEvent(event);
  };

  const noop = () => {};
  const dates = {
    primary: {
      start: '2017-01-01',
      end: '2017-01-07',
    },
  };
  const ranges = [
    { count: 1, unit: 'week' },
    { count: 1, unit: 'month' },
    { count: 1, unit: 'year' },
  ];

  it('should render without blowing up', () => {
    const wrapper = shallow(<DatePicker onChange={ noop } />);

    expect(wrapper.length).to.equal(1);
  });

  it('should render a DatePickerWrapper when dates are provided', () => {
    const wrapper = shallow(<DatePicker dates={ dates } onChange={ noop } />);

    expect(wrapper.find('DatePickerWrapper').length).to.equal(1);
  });

  it('should pass the correct range to the DatePickerWrapper when dates are provided', () => {
    const wrapper = shallow(<DatePicker dates={ dates } onChange={ noop } ranges={ ranges } />);
    const range = wrapper.find('DatePickerWrapper').prop('range');

    expect(range.start.format('YYYY-MM-DD')).to.equal(dates.primary.start);
    expect(range.end.format('YYYY-MM-DD')).to.equal(dates.primary.end);
  });

  it('should pass ranges to the DatePickerWrapper when ranges are provided', () => {
    const wrapper = shallow(<DatePicker dates={ dates } onChange={ noop } ranges={ ranges } />);

    expect(wrapper.find('DatePickerWrapper').prop('ranges').length).to.equal(3);
  });

  it('should open the datepicker when clicking on the datepicker button', () => {
    const wrapper = mount(<DatePicker onChange={ noop } dates={ dates } />);

    expect(document.getElementsByClassName('rc-datepicker').length).to.equal(0);
    wrapper.find('.rc-datepicker-button').first().simulate('click');
    expect(document.getElementsByClassName('rc-datepicker').length).to.equal(1);
    wrapper.find('.rc-datepicker-button').first().simulate('click');
    expect(document.getElementsByClassName('rc-datepicker').length).to.equal(0);
  });

  it('should not render a DatePickerWrapper when a message is provided', () => {
    const wrapper = shallow(<DatePicker onChange={ noop } message="message" />);

    expect(wrapper.find('DatePickerWrapper').length).to.equal(0);
  });

  it('should render a message when one is provided', () => {
    const wrapper = shallow(<DatePicker onChange={ noop } message="message" />);

    expect(wrapper.find('Button').prop('children')).to.equal('message');
  });

  it('should emit dates in the supplied timezone', (done) => {
    const timezone = 'America/New_York';

    const callback = (dates) => {
      expect(dates.start.tz()).to.equal(timezone);
      expect(dates.end.tz()).to.equal(timezone);
      done();
    };

    const wrapper = mount(<DatePicker disablePopoverPortal={ true } onChange={ callback } timezone="America/New_York" dates={ dates } />);

    // Open the DatePicker
    wrapper.find('.rc-datepicker-button').first().simulate('click');

    // Find the wrapper, we'll simulate a change event on it.
    const first = wrapper.find('.rc-datepicker__Date').first();
    first.simulate('mouseenter');
    first.simulate('mousedown');
    fireMouseUp();

    const last = wrapper.find('.rc-datepicker__Date').last();

    last.simulate('mouseenter');
    last.simulate('mousedown');
    fireMouseUp();
  });
});
