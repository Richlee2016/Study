import { scope, ScopeEnum, provide } from "midway";
import * as Mongoose from "mongoose";
@scope(ScopeEnum.Singleton)
@provide("DB")
export class DB {
  public static async initDB() {
    const db = Mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("your DB is open");
    });
    Mongoose.connect("mongodb://120.79.228.82:27017/wechat");
  }
}
