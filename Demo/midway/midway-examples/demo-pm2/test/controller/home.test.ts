import { app, assert } from 'midway-mock/bootstrap';

describe('test/controller/home.test.ts', () => {
  it('should assert config.keys', () => {
    const pkg = require('../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect('Welcome to midwayjs!')
      .expect(200);
  });
});
