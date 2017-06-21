import { format } from 'd3-format';

const formatters = {
  decimal: format('.2f'),
  dollars: format('$.2s'),
  numeric: format(',d'),
  numeric_percentage: d => (`${format('.1f')(d)}%`),
  percentage: format('.1%'),
  summary: format('.2s'),
};

export default formatters;
