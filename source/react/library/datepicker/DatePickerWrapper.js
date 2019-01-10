import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  range: PropTypes.shape({}),
  ranges: PropTypes.arrayOf(PropTypes.object),
  localeStrings: PropTypes.shape({
    customRange: PropTypes.string,
  }),
};

const defaultProps = {
  range: null,
  ranges: null,
  localeStrings: {
    customRange: 'Custom range',
  },
};

/**
 * NOTE: moment.duration().humanize() is the only built-in localized method for
 * time durations, but it is very imperfect. For example, there is no option to say
 * '1 day' instead of 'a day', and moment.duration(1, 'week').humanize() will result in
 * '7 days' rather than what you probably wanted. The solution is to pull in
 * [moment-duration-format](https://github.com/jsmreese/moment-duration-format) which allows
 * more complete localized duration formats. This would require any consuming project to extend
 * all locales (other than english) with [moment.updateLocale()](https://github.com/jsmreese/moment-duration-format#extending-moments-locale-object).
 * It seems prudent to assess the need for this change.
 * TODO: If there is wide-spread usage of custom date ranges in puppet insights and
 * other consuming projects, maybe make this change.
 */
const formatRange = range =>
  moment.duration(range.count, range.unit).humanize();

class DatePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.setRange = this.setRange.bind(this);
  }

  setRange(range, rangeOption) {
    const { onChange } = this.props;
    const dates = {};

    if (range.start && range.end) {
      dates.start = range.start;
      dates.end = range.end;
    } else {
      dates.start = range;
      dates.end = moment().endOf('day');
    }

    onChange(dates, null, rangeOption);
  }

  getRanges() {
    const { localeStrings, ranges } = this.props;

    if (!ranges || ranges.length === 0) return null;

    const rangesJSX = [];
    let custom = true;

    ranges.forEach((range, key) => {
      const start = moment()
        .startOf('day')
        .subtract(range.count, range.unit);
      const onClick = this.setRange.bind(this, start, range);
      const selected = this.isSelected(range);
      const className = classnames({ selected });

      if (selected) {
        custom = false;
      }

      const props = { key, onClick, className };

      rangesJSX.push(<li {...props}>{formatRange(range)}</li>);
    });

    rangesJSX.push(
      <li key="custom" className={classnames({ selected: custom })}>
        {localeStrings.customRange}
      </li>,
    );

    return <ul className="rc-ranges">{rangesJSX}</ul>;
  }

  isSelected(range) {
    const { range: currentRange } = this.props;
    const currentStart = currentRange.start;
    const currentEnd = currentRange.end;
    const rangeStart = moment()
      .startOf('day')
      .subtract(range.count, range.unit);
    const rangeEnd = moment().startOf('day');

    return (
      currentStart.diff(rangeStart, 'days') === 0 &&
      currentEnd.diff(rangeEnd, 'days') === 0
    );
  }

  render() {
    const { onChange, range } = this.props;
    const ranges = this.getRanges();

    return (
      <div className="rc-datepicker-container">
        <DateRangePicker
          numberOfCalendars={2}
          selectionType="range"
          bemBlock="rc-datepicker"
          onSelect={onChange}
          value={range}
          singleDateRange
        />
        {ranges}
      </div>
    );
  }
}

DatePickerWrapper.propTypes = propTypes;
DatePickerWrapper.defaultProps = defaultProps;

export default DatePickerWrapper;
