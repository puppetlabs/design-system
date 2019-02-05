import { format } from 'd3-format';
import getLocale from './getLocale';

const stripInsignificantZeros = value =>
  value.replace(/(?:(?:\.0+)|(\.\d*?)0+)(?=[a-zA-Z]?$)/, '$1');

/**
 * Threshold checker for a 'long' number that should be formatted with shortened
 * SI notation
 */
const isLong = number => Math.abs(number) >= 1000;

/**
 * Formats a number according to a users browser locale settings
 * using [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
 * @param  {Number} number    Number to format
 * @param  {Object} [options] Optional formatter options. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 * @param  {String} [locale]  Optional locale override for testing and experimenting
 * @return {String}           Formatted Number
 */
const localeFormat = (number, options, locale) => {
  const defaultOptions = {
    useGrouping: false,
    maximumFractionDigits: 2,
  };

  const formatter = new Intl.NumberFormat(locale || getLocale(), {
    ...defaultOptions,
    ...options,
  });

  return formatter.format(number);
};

/**
 * Formats a number with an SI prefix. Not localized
 */
const siFormat = number => {
  let formatted = format('s')(number);

  // D3 uses the correct metric prefix symbol show here:
  // https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes
  // However, i assert that end users don't understand these symbols
  // in the default context. Instead i believe they would expect to see
  // shorthand for billions.
  if (formatted.match(/G$/)) {
    formatted = formatted.replace('G', 'B');
  }

  return stripInsignificantZeros(formatted);
};

/**
 * NOTE: Intl.NumberFormat doens't have a great solution for a rounded number
 * format such as SI-prefix with d3.format('s'). For now leaving
 * large numbers un-internationalized.
 * TODO: Internationalize d3.format('s') or investigate a different rounded format
 */
const number = value => {
  if (isLong(value)) {
    return siFormat(value);
  }

  return localeFormat(value);
};

/**
 * General method for currency formatting. Eventually this could be used with ingights-embed
 * so that the user could specify an amount and the currency code
 */
const currency = (value, currencyCode) =>
  localeFormat(value, { style: 'currency', currency: currencyCode });

const dollars = value => {
  if (isLong(value)) {
    return `$${siFormat(value)}`;
  }

  return currency(value, 'USD');
};

/**
 * This will format 0.12 as 12%
 */
const percentage = value => localeFormat(value, { style: 'percent' });

/**
 * This will format 12 as 12%
 */
/* eslint-disable camelcase */
const numeric_percentage = value => percentage(value / 100);
/* eslint-enable camelcase */

const formatters = {
  default: number,
  dollars,
  percentage,
  numeric_percentage,
};

export default formatters;
