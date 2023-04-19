const express = require('express')
const app = express()
const port = 3000
const {upload,uploadFiles} = require('./controllers/upload');
const fs = require('fs');
const http = require('http');






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/upload_files", upload.array("files"),uploadFiles);


app.get('/download/:filename', (req, res) => {
  const currentDir = __dirname;
  const file = currentDir+'/output/'+req.params.filename;
  // const fileName = '1681702975715-merged-60fxpwh.txt';
  res.download(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
});

app.delete('/file/:filename', (req, res) => {
  const currentDir = __dirname;
  const file = currentDir+'/output/'+req.params.filename;

  fs.unlink(file, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while deleting the file.');
    }
    res.json({Message:'File deleted successfully.'});
  });
});


app.post('/deleteAllFiles', (req, res) => {
  const currentDir = __dirname;
  const dir = currentDir+'/output/';

  fs.readdirSync(dir).forEach(f => fs.rmSync(`${dir}/${f}`));
  res.json({Message:'File deleted successfully.'});

});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})