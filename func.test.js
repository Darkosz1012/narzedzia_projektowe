const func = require('./func');

test('func returns Hello world', () => {
  expect(func()).toBe("Hello world");
});