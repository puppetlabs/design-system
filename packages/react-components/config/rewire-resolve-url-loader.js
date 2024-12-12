/* eslint-disable no-param-reassign */
function rewireResolveUrlLoader(config, env = 'development') {
  const { oneOf } = config.module.rules.find(
    (rule) => rule.oneOf !== undefined,
  );
  const scssRules = oneOf.filter((rule) => String(rule.test).includes('scss'));

  scssRules.forEach((rule) => {
    const loaderKey = rule.loader ? 'loader' : 'use';
    const sassLoaderIndex = rule[loaderKey].findIndex(
      (loader) =>
        (typeof loader === 'string' && loader.includes('sass-loader')) ||
        (loader.loader && loader.loader.includes('sass-loader')),
    );

    // resolve-url-loader requires preceding loaders to have source maps enabled
    if (typeof rule[loaderKey][sassLoaderIndex] === 'string') {
      rule[loaderKey][sassLoaderIndex] = {
        loader: rule[loaderKey][sassLoaderIndex],
        options: { sourceMap: true },
      };
    } else if (typeof rule[loaderKey][sassLoaderIndex] === 'object') {
      rule[loaderKey][sassLoaderIndex].options.sourceMap = true;
    }

    // Insert resolve-url-loader next to sass-loader
    rule[loaderKey].splice(sassLoaderIndex, 0, {
      loader: 'resolve-url-loader',
    });
  });

  return config;
}

module.exports = rewireResolveUrlLoader;
