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
 * Splits a name either at capital casing, camel or snake delimiters
 * e.g. my-component => ['my', 'component'];
 *      myComponent => ['my', 'component'];
 */
const parseName = pipe(
  split(/-|_|(?=[A-Z])/),
  map(toLower),
);

const capitalizeFirst = name => concat(toUpper(head(name)), tail(name));

const toCaps = pipe(
  map(capitalizeFirst),
  join(''),
);

const toCamel = parsedName =>
  concat(head(parsedName), toCaps(tail(parsedName)));

const toDash = join('-');

const getNameVariants = pipe(
  parseName,
  parsedName => ({
    caps: toCaps(parsedName),
    camel: toCamel(parsedName),
    dash: toDash(parsedName),
  }),
);

module.exports = getNameVariants;
