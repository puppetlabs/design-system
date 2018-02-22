import { format } from 'd3-format';

function stripInsignificantZeros(value) {
  return value.replace(/(?:(?:\.0+)|(\.\d*?)0+)(?=[a-zA-Z]?$)/, '$1');
}

const formatters = {
  default: (value) => {
    let formatted = format('.2f')(value);

    if (formatted >= 1000 || formatted <= -1000) {
      formatted = format('s')(formatted);

      // D3 uses the correct metric prefix symbol show here:
      // https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes
      // However, i assert that end users don't understand these symbols
      // in the default context. Instead i believe they would expect to see
      // shorthand for billions.
      if (formatted.match(/G$/)) {
        formatted = formatted.replace('G', 'B');
      }
    }

    return stripInsignificantZeros(formatted);
  },
  dollars: (value) => {
    let formatted;

    if (value >= 1) {
      formatted = format('$s')(value);
    } else {
      formatted = `$${format('.2f')(value)}`;
    }

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
};

export default formatters;
