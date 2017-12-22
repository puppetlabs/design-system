import React from 'react';
import classnames from 'classnames';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';

const propTypes = {
  onChange: React.PropTypes.func.isRequired,
  range: React.PropTypes.object,
  ranges: React.PropTypes.array,
};

const defaultProps = {
  range: null,
  ranges: null,
};

class DatePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.setRange = this.setRange.bind(this);
  }

  setRange(range) {
    const dates = {};

    if (range.start && range.end) {
      dates.start = range.start;
      dates.end = range.end;
    } else {
      dates.start = range;
      dates.end = moment().endOf('day');
    }

    this.props.onChange(dates);
  }

  getRanges() {
    if (!this.props.ranges || this.props.ranges.length === 0) return null;

    const ranges = [];
    let custom = true;

    // Um, we can do better than this...
    const pluralize = (thing, count) => (count > 1 ? `${thing}s` : thing);

    this.props.ranges.forEach((range, key) => {
      const start = moment().startOf('day').subtract(range.count, range.unit);
      const onClick = this.setRange.bind(this, start);
      const selected = this.isSelected(range);
      const className = classnames({ selected });

      if (selected) {
        custom = false;
      }

      const props = { key, onClick, className };

      ranges.push(<li { ...props }>{range.count} {pluralize(range.unit, range.count)}</li>);
    });

    ranges.push(<li key="custom" className={ classnames({ selected: custom }) }>Custom range</li>);

    return (
      <ul className="rc-ranges">
        {ranges}
      </ul>
    );
  }

  isSelected(range) {
    const currentStart = this.props.range.start;
    const currentEnd = this.props.range.end;
    const rangeStart = moment().startOf('day').subtract(range.count, range.unit);
    const rangeEnd = moment().startOf('day');

    return (currentStart.diff(rangeStart, 'days') === 0) &&
      (currentEnd.diff(rangeEnd, 'days') === 0);
  }

  render() {
    const ranges = this.getRanges();

    return (
      <div className="rc-datepicker-container">
        <DateRangePicker
          numberOfCalendars={ 2 }
          selectionType={ 'range' }
          bemBlock="rc-datepicker"
          onSelect={ this.props.onChange }
          value={ this.props.range }
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
