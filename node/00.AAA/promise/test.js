const Promise = require("./A")

const a = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(1);
        resolve(321);
      }, 2000);
    });
  };
  
  console.log(a());