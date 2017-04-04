import React from 'react';
import listensToClickOutside from 'react-onclickoutside/decorator';
import classnames from 'classnames';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this._setRange = this._setRange.bind(this);
  }

  handleClickOutside() {
    this.props.onHide();
  }

  _setRange(range) {
    if (range.start && range.end) {
      this.props.setRange(range.start, range.end);
    } else {
      this.props.setRange(range);
    }
  }

  _isSelected(range) {
    let currentStart = this.props.range.start,
      currentEnd = this.props.range.end,
      rangeStart = moment().startOf('day').subtract(range.count, range.unit),
      rangeEnd = moment().startOf('day');

    return (currentStart.diff(rangeStart, 'days') === 0) &&
      (currentEnd.diff(rangeEnd, 'days') === 0);
  }

  _getRanges() {
    if (!this.props.ranges || this.props.ranges.length === 0) return null;

    let ranges = [],
      custom = true,
      pluralize;

    // Um, we can do better than this...
    pluralize = function (thing, count) {
      if (count > 1) {
        return thing + 's';
      } else {
        return thing;
      }
    };

    this.props.ranges.forEach((range, key) => {
      let start = moment().startOf('day').subtract(range.count, range.unit),
        onClick = this._setRange.bind(this, start),
        selected = this._isSelected(range),
        className = classnames({ selected }),
        props;

      if (selected) {
        custom = false;
      }

      props = { key, onClick, className };

      ranges.push(<li { ...props }>{range.count} {pluralize(range.unit, range.count)}</li>);
    });

    ranges.push(<li key="custom" className={ classnames({ selected: custom }) }>Custom range</li>);

    return (
      <ul className="viz-ranges">
        {ranges}
      </ul>
    );
  }

  render() {
    const ranges = this._getRanges();

    return (
      <div className="viz-datepicker-container">
        <DateRangePicker
          numberOfCalendars={ 2 }
          selectionType={ 'range' }
          bemBlock="viz-datepicker"
          onSelect={ this._setRange }
          value={ this.props.range }
          singleDateRange
        />
        {ranges}
      </div>
    );
  }
}

export default listensToClickOutside(DateRangePickerWrapper);
