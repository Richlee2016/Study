import MVVM from "./mvvm";
let myData = {
  box: 1,
  // one:{
  //   two:2
  // }
};

const mvvm = new MVVM({
  data: myData
});
// let b = mvvm.$data.box + 2;
// console.log(mvvm.$data.box);
// console.log(mvvm);
// myData.box = 2;
// myData.one.two = "go"
