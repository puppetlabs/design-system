import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

const propTypes = {
  /** Html element or react component to render */
  as: PropTypes.elementType,
  /** Weekday */
  weekday: PropTypes.oneOf(['narrow', 'short', 'long']),
  /** era */
  era: PropTypes.oneOf(['narrow', 'short', 'long']),
  /** Year */
  year: PropTypes.oneOf(['2-digit', 'numeric']),
  /** Month */
  month: PropTypes.oneOf(['2-digit', 'numeric', 'narrow', 'short', 'long']),
  /** Day */
  day: PropTypes.oneOf(['2-digit', 'numeric']),
  /** Hour */
  hour: PropTypes.oneOf(['2-digit', 'numeric']),
  /** Minute */
  minute: PropTypes.oneOf(['2-digit', 'numeric']),
  /** Second */
  second: PropTypes.oneOf(['2-digit', 'numeric']),
  /** Timezone */
  timeZoneName: PropTypes.oneOf(['short', 'long']),
  /** Text body */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
  as: 'time',
  children: '',
  year: null,
  month: null,
  day: null,
  hour: null,
  minute: null,
  second: null,
  timeZoneName: null,
  era: null,
  weekday: null,
};

const acceptableOptions = [
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'timeZoneName',
  'era',
  'weekday',
];

const Time = ({ as: Element, children, ...restProps }) => {
  const time = new Date(children);
  const formatedTime = new Intl.DateTimeFormat(
    navigator.languages ? navigator.languages[0] : navigator.language,
    {
      ...pickBy(restProps, (val, key) => {
        return val && acceptableOptions.indexOf(key) >= 0;
      }),
    },
  ).format(time);
  return (
    <Element
      {...{
        ...(Element === 'time' && { datetime: time.toISOString() }),
      }}
    >
      {formatedTime}
    </Element>
  );
};

Time.propTypes = propTypes;
Time.defaultProps = defaultProps;

export default Time;
