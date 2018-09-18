const getNameVariants = require('./getNameVariants');

test('should correctly transform dash-cased names', () => {
  getNameVariants('my-component').should.eql({
    caps: 'MyComponent',
    camel: 'myComponent',
    dash: 'my-component',
  });
});

test('should correctly transform camel-cased names', () => {
  getNameVariants('myComponent').should.eql({
    caps: 'MyComponent',
    camel: 'myComponent',
    dash: 'my-component',
  });
});

test('should correctly transform arbitrarily separated names names', () => {
  getNameVariants('my-componentTest').should.eql({
    caps: 'MyComponentTest',
    camel: 'myComponentTest',
    dash: 'my-component-test',
  });
});
