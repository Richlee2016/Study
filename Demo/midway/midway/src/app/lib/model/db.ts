import { scope, ScopeEnum, provide, async, init } from "midway";
import * as Mongoose from "mongoose";
@scope(ScopeEnum.Singleton)
@async()
@provide("DB")
export default class DB {
  @init()
  connect() {
    const db = Mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      require("./movie");
      console.log("server is connecting");
    });
    Mongoose.connect("mongodb://120.79.228.82:27017/wechat");
  }
}
