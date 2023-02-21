var multer = require('multer');
const AdmZip = require("adm-zip");
const { CombinetxtFile } = require("../controllers/CombineFiles");
const timestamp = Date.now();
var fs = require('fs');





// Upload file and store as original name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/') // where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, timestamp + "-" + file.originalname) // using the file's original name
  }
})
const upload = multer({ storage: storage })





function uploadFiles(req, res) {
  console.log(req.files);
 
 
  req.files.forEach((element) => {
    
    const directory = "tmp/"+timestamp +"-"+"dist";
    
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    const zip = new AdmZip(element.path);
    zip.extractAllTo(directory);


    let output = "output/"+timestamp+"-"+"merged.txt";
    CombinetxtFile(directory, output);
    
    if (fs.existsSync(directory)) {
      fs.rm(directory, {recursive: true}, (error) => {
        if (error) throw error;
       
      });
      }

      if (fs.existsSync(element.path)) {
        fs.rm(element.path, {recursive: true}, (error) => {
          if (error) throw error;
         
        });
        }
   
  });

  res.json({ message: "Successfully uploaded files" });

}





module.exports = { upload, uploadFiles }
