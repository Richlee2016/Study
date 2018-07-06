import MVVM from "./mvvm/index";
import * as Design from "./design/index";

for (let [key, fn] of Object.entries(Design)) {
  fn();
}

let myData = {
box: 1,
// one:{
//   two:2
// }
};

const mvvm = new MVVM({
  el:"#app",
  data: myData
});
// let b = mvvm.$data.box + 2;
// console.log(mvvm.$data.box);
// console.log(mvvm);
myData.box = 2;
// myData.one.two = "go"
// console.log(mvvm);
