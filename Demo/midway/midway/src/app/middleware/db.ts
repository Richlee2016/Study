export default function(options: any, app: any): any {
  return async (ctx: any, next: any) => {
    console.log(321);
    await next();
  };
}
