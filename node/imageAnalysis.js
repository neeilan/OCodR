var Promise = require('bluebird'),
    writeFile = Promise.promisify(require('fs').writeFile),
    fs = require('fs'),
    path = require('path'),
    pyScriptPath = path.join(__dirname, '/..','/imageAnalysis','/test.py');

module.exports.analyze = function (imagePath, res) {
    console.log('spawining child process');
    const spawn = require('child_process').spawn;
    const ls = spawn('python', [pyScriptPath, imagePath]);
    
    ls.stdout.on('data', (data) => {
        console.log(data.toString());
        // res.end(data.toString());
    });
    
    ls.stderr.on('data', (data) => {
        res.status(500).end();
    }); 
    
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}