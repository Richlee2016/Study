const gulp = require("gulp");
const requireDir = require("require-dir");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

requireDir("./tasks");

gulp.task("watcher", () => {
  gulp.watch("app/fonts/*", gulp.series("files:fonts"));
  gulp.watch("app/plugin/*", gulp.series("files:plugin"));
  gulp.watch("app/images/*", gulp.series("files:images"));
  gulp.watch("app/views/*", gulp.series("files:html"));
  gulp.watch("app/**/*.js", gulp.series("script"));
  gulp.watch("app/css/*.css", gulp.series("style:css"));
  gulp.watch("app/css/*.less", gulp.series("style:less"));
});

gulp.task("server", () => {
  browserSync.init({
    proxy: "http://localhost:7001"
  });

  gulp
    .watch([
      "app/views/*.html",
      "app/less/*.less",
      "app/js/*.js",
      "app/css/*.less",
      "app/css/*.css"
    ])
    .on("change", function() {
      reload();
    });
});

const style = gulp.parallel("style:css", "style:less");
const files = gulp.parallel(
  "files:images",
  "files:fonts",
  "files:plugin",
  "files:html"
);
const watchServer = gulp.parallel("watcher", "server");

gulp.task("default", gulp.series("script", style, files, watchServer));
