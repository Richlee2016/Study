import { WebMiddleware, provide, config } from "midway";

@provide()
export class ApiMiddleware implements WebMiddleware {
  @config("hello")
  helloConfig;

  resolve() {
    return async (ctx, next) => {
      console.log(321);
      await next();
    };
  }
}
