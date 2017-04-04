import React from 'react';
import moment from 'moment';
import DatePickerWrapper from './DatePickerWrapper';
import Button from '../Button';

const EVENT_IDENTIFIER = 'datePicker';

const propTypes = {
  dates: React.PropTypes.object,
  ranges: React.PropTypes.array,
};

class DatePicker extends React.Component {

  constructor(props) {
    super(props);

    const dates = this.props.dates;
    let start = null;
    let end = null;

    if (dates) {
      start = dates.primary.start;
      end = dates.primary.end;
    }

    this.state = {
      open: false,
      start,
      end,
    };

    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.setDateRange = this.setDateRange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dates && nextProps.dates.primary) {
      this.setState({
        start: nextProps.dates.primary.start,
        end: nextProps.dates.primary.end,
      });
    }
  }

  // Default to current time
  setDateRange(start, end = moment().endOf('day')) {
    const newRange = { start, end };
    const oldRange = { start: this.state.start, end: this.state.end };
    const newFilters = helpers.rangeToFilters(newRange, this.props.fields, true);
    const oldFilters = helpers.rangeToFilters(oldRange, this.props.fields, true);

    this.props.dispatch(updateDates({ primary: newRange }));
    this.props.dispatch(replaceFilters(oldFilters, newFilters));

    const newDates = [moment(newFilters[0].value), moment(newFilters[1].value)];

    this.props.dispatchEvent(EVENT_IDENTIFIER, DATE_RANGE_CHANGE, newDates);

    this.setState({
      start,
      end,
      open: false,
    });
  }

  getButton(start, end, message) {
    const props = {
      color: (message ? 'dashed' : 'white'),
      className: 'viz-datepicker-button',
      onClick: this.showPicker,
      // Only disable it if we're in edit mode and there's a message to display
      disabled: !!(this.props.editMode && message),
    };
    let buttonBody;

    if (message) {
      buttonBody = message;
    } else {
      buttonBody = (
        <div>
          <span className="date">{ start.format('MMM D, YYYY') }</span>
          <span className="viz-separator"> to </span>
          <span className="date">{ end.format('MMM D, YYYY') }</span>
        </div>
      );
    }

    return (<Button { ...props } >{ buttonBody }</Button>);
  }

  getWrapper(start, end) {
    const props = {
      onHide: this.hidePicker,
      setRange: this.setDateRange,
      range: moment.range(start, end),
      ranges: this.props.ranges,
    };

    return <DatePickerWrapper { ...props } />;
  }

  getConfigurationMessage() {
    let message;

    if (!this.props.fields || !this.props.fields.length) {
      message = 'Set a time field on a component';
    } else if (!this.state.start || !this.state.end) {
      message = 'Set a default range';
    }

    // It's configured!
    return message;
  }

  showPicker() {
    this.setState({ open: true });
  }

  hidePicker() {
    this.setState({ open: false });
  }

  render() {
    const { open, start, end } = this.state;

    const configurationMessage = this.getConfigurationMessage();
    let wrapper = null;

    if (!this.props.editMode && configurationMessage) {
      return null;
    }

    const button = this.getButton(start, end, configurationMessage);

    if (open) {
      wrapper = this.getWrapper(start, end);
    }

    return (
      <div>
        { button }
        { wrapper }
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;

export default DatePicker;
