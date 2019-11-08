import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/home', controller.home.home);
  router.post('/testPost', controller.home.postTest);
};
