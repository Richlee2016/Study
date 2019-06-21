import { Context, Application } from "midway";
export default function(options: Record<string, any>, app: Application): any {
  return async (ctx: Context, next: () => Promise<Record<string, any>>) => {
    try {
      await next();
    } catch (err) {
      app.emit("error", err);
      const status = err.status || 500;
      const error_msg =
        status === 500 && app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;
      ctx.body = { error_msg };
      ctx.body.success = false;
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
}
