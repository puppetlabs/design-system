const toCamel = name => name[0].toLowerCase().concat(name.slice(1));

const dasherize = name =>
  name
    .replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, `$1-$2`)
    .replace(
      /(\p{Lowercase_Letter}+)(\p{Uppercase_Letter}[\p{Lowercase_Letter}\d]+)/gu,
      `$1-$2`,
    )
    .toLowerCase();

const capitalizeFirst = name => name[0].toUpperCase().concat(name.slice(1));

const getNameVariants = name => ({
  camel: toCamel(name),
  dash: dasherize(name),
  caps: capitalizeFirst(name),
});

module.exports = getNameVariants;
