import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import DatePickerWrapper from './DatePickerWrapper';
import Button from '../Button';
import Popover from '../Popover';

const propTypes = {
  onChange: React.PropTypes.func.isRequired,
  anchor: React.PropTypes.string,
  className: React.PropTypes.string,
  dates: React.PropTypes.object,
  disabled: React.PropTypes.bool,
  message: React.PropTypes.string,
  ranges: React.PropTypes.array,
};

const defaultProps = {
  anchor: 'bottom left',
};

/**
 * `Datepicker` allows a user to select a single date range
 *
 * @example ../../../../docs/DatePicker.md
 */

class DatePicker extends React.Component {

  constructor(props) {
    super(props);

    const dates = this.props.dates;
    let start = null;
    let end = null;

    if (dates) {
      const primaryStart = dates.primary.start;
      const primaryEnd = dates.primary.end;

      start = moment.isMoment(primaryStart) ? primaryStart : moment(primaryStart);
      end = moment.isMoment(primaryEnd) ? primaryEnd : moment(primaryEnd);
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
        start: nextProps.dates.primary.start,
        end: nextProps.dates.primary.end,
      });
    }
  }

  onChange(dates) {
    this.props.onChange(dates);

    this.popover.close();
  }

  getButton(start, end) {
    const message = this.props.message;
    const props = {
      transparent: true,
      className: 'rc-datepicker-button',
      disabled: this.props.disabled || this.props.message,
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
