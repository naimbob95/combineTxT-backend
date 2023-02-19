var multer = require('multer');
const {zip} = require('./extract-zip');
const AdmZip = require("adm-zip");





// Upload file and store as original name
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploaded/') // where files will be saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"-"+file.originalname) // using the file's original name
    }
  })
const upload = multer({ storage: storage })


//return the file information after uploaded
function uploadFiles(req, res) {
    // console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
    req.files.forEach((element)=>{
        const zip = new AdmZip(element.path);
        zip.extractAllTo("dist");
    })
    
}


   
module.exports = { upload,uploadFiles }
