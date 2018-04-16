import 'moment-timezone';

// moment-timezone monkey patches moment.
import PropTypes from 'prop-types';

import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import DatePickerWrapper from './DatePickerWrapper';
import Button from '../buttons/Button';
import Popover from '../popover/Popover';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  anchor: PropTypes.string,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  dates: PropTypes.object,
  disabled: PropTypes.bool,
  message: PropTypes.string,
  timezone: PropTypes.string,
  ranges: PropTypes.array,
  disablePopoverPortal: PropTypes.bool,
};

const defaultProps = {
  className: '',
  anchor: 'bottom left',
  buttonClassName: '',
  dates: null,
  disabled: false,
  message: '',
  timezone: '',
  ranges: null,
  disablePopoverPortal: false,
};

const convertDate = (date, timezone) => {
  if (timezone) {
    return moment(date).tz(timezone);
  }

  return moment(date);
};

const parseDate = (date, timezone) => {
  // Not timezone is supplied so we don't want to do anything.
  if (!timezone) {
    return date;
  }

  return moment.tz(date.format('YYYY-MM-DD'), timezone);
};

/**
 * `Datepicker` allows a user to select a single date range
 */

class DatePicker extends React.Component {

  constructor(props) {
    super(props);

    const { dates, timezone } = this.props;
    let start = null;
    let end = null;

    if (dates) {
      const primaryStart = dates.primary.start;
      const primaryEnd = dates.primary.end;

      start = moment.isMoment(primaryStart) ? primaryStart : convertDate(primaryStart, timezone);
      end = moment.isMoment(primaryEnd) ? primaryEnd : convertDate(primaryEnd, timezone);
    }

    this.state = {
      start,
      end,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dates && nextProps.dates.primary) {
      this.setState({
        start: convertDate(nextProps.dates.primary.start),
        end: convertDate(nextProps.dates.primary.end),
      });
    }
  }

  onChange(dates) {
    // Convert the dates coming out of the picker in to the requested timezone
    // if the timezone info has been configured on the datepicker.
    dates.start = parseDate(dates.start, this.props.timezone);
    dates.end = parseDate(dates.end, this.props.timezone);

    this.props.onChange(dates);

    this.popover.close();
  }

  getButton(start, end) {
    const message = this.props.message;
    const props = {
      transparent: true,
      className: classnames('rc-datepicker-button', {
        [this.props.buttonClassName]: this.props.buttonClassName,
      }),
      disabled: !!(this.props.disabled || this.props.message),
    };
    let buttonBody;

    if (message) {
      buttonBody = message;
    } else if (start && end) {
      buttonBody = (
        <div>
          <span className="date">{ start.format('MMM D, YYYY') }</span>
          <span> to </span>
          <span className="date">{ end.format('MMM D, YYYY') }</span>
        </div>
      );
    }

    return (<Button { ...props } >{ buttonBody }</Button>);
  }

  getWrapper(start, end) {
    const button = this.getButton(start, end);
    const anchor = this.props.anchor;
    const props = {
      range: moment.range(start, end),
      ranges: this.props.ranges,
      onChange: this.onChange,
    };
    let jsx;

    if (this.props.message) {
      jsx = button;
    } else {
      jsx = (
        <Popover
          disablePortal={ this.props.disablePopoverPortal }
          ref={ (c) => { this.popover = c; } }
          padding={ false }
          target={ button }
          anchor={ anchor }
        >
          <DatePickerWrapper { ...props } />
        </Popover>
      );
    }

    return jsx;
  }

  getConfigurationMessage() {
    let message;

    if (this.props.message) {
      message = this.props.message;
    }

    return message;
  }

  render() {
    const wrapper = this.getWrapper(this.state.start, this.state.end);
    const className = classnames('rc-datepicker-wrapper', this.props.className);

    return (
      <div className={ className }>
        { wrapper }
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
