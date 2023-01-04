const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const { generateRandom } = require('../helpers/common-function.helper');

const convertUserExcelToJson = async (req, res, next) => {
  const userObjArray = [];
  const path = 'uploads/' + req.file.originalname;
  await readXlsxFile(fs.createReadStream(path)).then((rows) => {
    rows.forEach((row) => {
      const tempObj = {
        firstName: row[0],
        lastName: row[1],
        email: row[2],
        role: row[3],
        password: generateRandom(10, true),
        organization: row[4],
        contactNumber: row[5].toString()
      };
      userObjArray.push(tempObj);
    });
  });
  req.body = {
    users: userObjArray
  };

  console.log(req.body);
  next();
};

module.exports = {
  convertUserExcelToJson
};
