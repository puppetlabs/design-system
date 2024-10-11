const {
  split,
  map,
  pipe,
  toLower,
  head,
  tail,
  toUpper,
  concat,
  join,
} = require('ramda');

/**
 * Splits a name at capital casing, camel, snake, dash, or space delimiters
 * e.g. my-component => ['my', 'component'];
 *      myComponent => ['my', 'component'];
 */
const parseName = pipe(split(/-|_| |(?=[A-Z])/), map(toLower));

const capitalizeWords = map((name) => concat(toUpper(head(name)), tail(name)));

const humanize = pipe(parseName, capitalizeWords, join(' '));

const pascalize = pipe(parseName, capitalizeWords, join(''));

const camelize = pipe(parseName, (parsedName) =>
  concat(head(parsedName), capitalizeWords(tail(parsedName)).join('')),
);

const dasherize = pipe(parseName, join('-'));

const getNameVariants = (original) => ({
  original,
  humanized: humanize(original),
  pascalized: pascalize(original),
  camelized: camelize(original),
  dasherized: dasherize(original),
});

module.exports = getNameVariants;
