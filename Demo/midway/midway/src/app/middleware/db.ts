import { Context, Application } from "midway";
export default function(options: Record<string, any>, app: Application): any {
  return async (ctx: Context, next: () => Promise<Record<string, any>>) => {
    console.log(321);
    await next();
  };
}
