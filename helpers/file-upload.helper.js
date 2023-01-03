const multer = require('multer');
const fileStorage = multer.diskStorage({
  // Destination to store file
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileUpload = multer({
  storage: fileStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.xlsx/)) {
      // upload only xlsx file
      return cb(undefined, false);
    }
    cb(undefined, true);
  }
});

module.exports = {
  fileUpload
};
