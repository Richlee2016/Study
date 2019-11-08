const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

app.use("/", router);

app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.set("views", path.resolve(__dirname, "../dist/views"));
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

app.listen(7001, () => {
  console.log("服务启动7001");
});
