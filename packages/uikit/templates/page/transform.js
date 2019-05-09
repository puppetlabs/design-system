const getNameVariants = require('../../bin/getNameVariants/getNameVariants');

const transform = ({ source }, { jscodeshift: j }, { name: originalName }) => {
  const root = j(source);
  const name = getNameVariants(originalName);

  // Add import
  const lastImport = root.find(j.ImportDeclaration).at(-1);
  lastImport.insertAfter(
    `import ${name.pascalized} from 'routes/${name.original}';`,
  );

  // Add route
  // { title: 'Example', path: '/example', view: Example }
  const newRoute = j.objectExpression([
    j.property('init', j.identifier('title'), j.literal(name.humanized)),
    j.property('init', j.identifier('path'), j.literal(`/${name.dasherized}`)),
    j.property('init', j.identifier('view'), j.identifier(name.pascalized)),
  ]);
  const lastRoute = root
    .find(j.VariableDeclarator, {
      id: {
        name: 'routes',
      },
      init: {
        type: 'ArrayExpression',
      },
    })
    .find(j.ArrayExpression)
    .find(j.ObjectExpression)
    .at(-1);
  lastRoute.insertAfter(newRoute);

  return root.toSource({ quote: 'single' });
};

module.exports = transform;
