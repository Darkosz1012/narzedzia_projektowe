const func = require('./func');

test('func returns Hello world', () => {
  expect(func()).toBe("Hello world");
});
// test('func returns Hello world failed', () => {
//   expect(func()).toBe("Hello worldsdfsdf");
// });