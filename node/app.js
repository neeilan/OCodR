var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    imageAnalysis = require('./imageAnalysis.js'),
    multer = require('multer'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');

app.use(express.static('public'))
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
multer({ storage: multer.MemoryStorage });

app.post('/image', (req,res)=>{
  var form = new formidable.IncomingForm();
  form.multiples = true;
  const saveDir = path.join(__dirname,'/uploads/');

  if (!fs.existsSync(saveDir)){
    fs.mkdirSync(saveDir);
    }

  form.uploadDir = saveDir;

  form.on('file', function(field, file) {
    var imagePath = path.join(form.uploadDir, file.name);
    fs.renameSync(file.path, imagePath);
    imageAnalysis.analyze(imagePath, res);
  });
  
  form.on('error', function(err) {
    if (err) res.end(400);
  });
  
  
   form.parse(req, function(err, fields, files) {
      if (err) res.end(400);
  });
})

app.listen(port, () => console.log('Running on ' + port));