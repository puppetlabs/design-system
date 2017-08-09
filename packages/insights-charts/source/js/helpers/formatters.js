import { format } from 'd3-format';

function stripInsignificantZeros(value) {
  return value.replace(/(?:(?:\.0+)|(\.\d*?)0+)(?=[a-zA-Z]?$)/, '$1');
}

const formatters = {
  decimal: format('.2f'),
  dollars: (value) => {
    const formatted = format('$s')(value);

    return stripInsignificantZeros(formatted);
  },
  numeric: (value) => {
    let formatted = format('d')(value);
    formatted = format('s')(formatted);


    return stripInsignificantZeros(formatted);
  },
  numeric_percentage: (value) => {
    const formatted = format('.2f')(value);
    const stripped = stripInsignificantZeros(formatted);

    return `${stripped}%`;
  },
  percentage: (value) => {
    const formatted = format('.2f')(value * 100);
    const stripped = stripInsignificantZeros(formatted);

    return `${stripped}%`;
  },
  summary: (value) => {
    const formatted = format('s')(value);

    return stripInsignificantZeros(formatted);
  },
};

export default formatters;
