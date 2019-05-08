const getNameVariants = require('./getNameVariants');

test('should correctly transform dash-cased names', () => {
  getNameVariants('my-component').should.eql({
    original: 'my-component',
    humanized: 'My Component',
    pascalized: 'MyComponent',
    camelized: 'myComponent',
    dasherized: 'my-component',
  });
});

test('should correctly transform camel-cased names', () => {
  getNameVariants('myComponent').should.eql({
    original: 'myComponent',
    humanized: 'My Component',
    pascalized: 'MyComponent',
    camelized: 'myComponent',
    dasherized: 'my-component',
  });
});

test('should correctly transform names with spaces', () => {
  getNameVariants('My Component').should.eql({
    original: 'My Component',
    humanized: 'My Component',
    pascalized: 'MyComponent',
    camelized: 'myComponent',
    dasherized: 'my-component',
  });
});

test('should correctly transform arbitrarily separated names names', () => {
  getNameVariants('my-componentTest').should.eql({
    original: 'my-componentTest',
    humanized: 'My Component Test',
    pascalized: 'MyComponentTest',
    camelized: 'myComponentTest',
    dasherized: 'my-component-test',
  });
});
