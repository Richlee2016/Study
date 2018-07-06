const {exec} = require('child_process');
exec('node ./a.js',(err,stdout,stderr) => {
    // console.log(arguments);
    console.log(stdout);
})
