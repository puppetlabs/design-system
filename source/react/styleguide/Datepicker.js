import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import DatePicker from '../library/datepicker/DatePicker';
import moment from 'moment';

class DatePickerPage extends React.Component {
  render() {
    const dates = {
      primary: {
        start: moment('2017-01-01'),
        end: moment('2017-01-30'),
      },
    };

    return (
      <div>
        <h1>DatePicker</h1>
        <StyleguideSection title="Basic DatePicker">
          <DatePicker
            onChange={ () => {  console.log(arguments); } }
            dates={ dates }
          />
        </StyleguideSection>
        <StyleguideSection title="DatePicker with Ranges">
          <DatePicker
            onChange={ () => {  console.log(arguments); } }
            ranges={ [
              { count: 1, unit: 'week' },
              { count: 1, unit: 'month' },
              { count: 1, unit: 'year' }
            ] }
            dates={ dates }
          />
        </StyleguideSection>
      </div>
    );
  }
}

export default DatePickerPage;
