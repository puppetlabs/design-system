import React from 'react';
import moment from 'moment';
import DatePickerWrapper from './DatePickerWrapper';
import Button from '../Button';
import Popover from '../Popover';

const propTypes = {
  onChange: React.PropTypes.func.isRequired,
  dates: React.PropTypes.object,
  ranges: React.PropTypes.array,
  message: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  anchor: React.PropTypes.string,
};

const defaultProps = {
  anchor: 'bottom left',
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

  onChange() {
    this.props.onChange();
  }

  // Default to current time
  setDateRange(start, end = moment().endOf('day')) {
    this.setState({
      start,
      end,
      open: false,
    });
  }

  getButton(start, end) {
    const message = this.props.message;
    const props = {
      color: (message ? 'dashed' : 'white'),
      className: 'rc-datepicker-button',
      onClick: this.showPicker,
      // Only disable it if we're in edit mode and there's a message to display
      disabled: this.props.disabled,
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
      onHide: this.hidePicker,
      setRange: this.setDateRange,
      range: moment.range(start, end),
      ranges: this.props.ranges,
    };
    let jsx;

    if (this.props.message) {
      jsx = button;
    } else {
      jsx = (
        <Popover padding={ false } target={ button } anchor={ anchor } >
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
    const { start, end } = this.state;
    const wrapper = this.getWrapper(start, end);

    return (
      <div className="rc-datepicker-wrapper">
        { wrapper }
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
