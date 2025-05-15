import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const imageName = `IMG${uniqueSuffix}.${file.originalname.split(".")[1]}`
      req.profile_image = imageName;
      cb(null, imageName);
    }
  })
  
  const upload = multer({ storage: storage })
  export default upload;