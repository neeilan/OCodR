var Promise = require('bluebird'),
    writeFile = Promise.promisify(require('fs').writeFile),
    fs = require('fs'),
    path = require('path'),
    pyScriptPath = path.join(__dirname, '/..','/imageanalysis','/threshold.py');

module.exports.analyze = function (imagePath, res) {
    console.log('spawining child process');
    const spawn = require('child_process').spawn;
    const ls = spawn('python', [pyScriptPath, imagePath]);
    var result = "";
    
    ls.stdout.on('data', (data) => {
	
        result+=(data.toString());
    });
    
    ls.stderr.on('data', (data) => {
        res.status(500).end();
    }); 
    
    ls.on('close', (code) => {
      res.end(JSON.stringify(result));
      console.log(`child process exited with code ${code}`);
    });
}
