const multer = require('multer');
const fileStorage = multer.diskStorage({
  // Destination to store file
  destination: 'uploads',
  filename: (req, res, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileUpload = multer({
  storage: fileStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      // upload only xlsx file
      return cb(new Error('Please upload a excel file'));
    }
    cb(undefined, true);
  }
});

module.exports = {
  fileUpload
};
