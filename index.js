const express = require('express')
const app = express()
const port = 3000
const {upload,uploadFiles} = require('./controllers/upload');





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/upload_files", upload.array("files"),uploadFiles);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})