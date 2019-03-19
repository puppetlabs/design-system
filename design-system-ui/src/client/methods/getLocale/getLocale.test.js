import getLocale from './getLocale';

Object.defineProperty(navigator, 'languages', {
  writable: true,
  value: ['test1'],
});

Object.defineProperty(navigator, 'language', {
  writable: true,
  value: 'test2',
});

test('Otherwise returns first entry off navigator.languages', () => {
  navigator.languages = ['test2'];
  navigator.language = 'test3';

  getLocale().should.eql('test2');
});

test('Otherwise returns navigator.language', () => {
  navigator.languages = undefined;
  navigator.language = 'test3';

  getLocale().should.eql('test3');
});

test('Returns env variable override if present', () => {
  navigator.languages = ['test2'];
  navigator.language = 'test3';
  process.env.BROWSER_LOCALE = 'test1';

  getLocale().should.eql('test1');
});
