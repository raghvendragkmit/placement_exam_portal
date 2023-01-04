const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const commonErrorHandler = async (
  req,
  res,
  message,
  statusCode = 500,
  error = null
) => {
  let errorMessage = 'Something went wrong. Please try again';
  if (message) {
    errorMessage = message;
  }

  if (error && error.message) {
    errorMessage = error.message;
  }
  req.error = error;

  const response = {
    statusCode,
    data: {},
    message: errorMessage
  };

  res.status(statusCode).json(response);
};

const generateRandom = (length = 32, alphanumeric = true) => {
  let data = '';
  let keys = '';

  if (alphanumeric) {
    keys = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  } else {
    keys = '0123456789';
  }

  for (let i = 0; i < length; i += 1) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }

  return data;
};

const sendResponse = async (req, res) => {
  const response = {
    statusCode: 200,
    data: res.data || {},
    message: 'Success'
  };
  return res.status(200).json(response);
};

const convertExcelToJson = async (path) => {
  const questionAnswersObj = [];
  await readXlsxFile(fs.createReadStream(path)).then((rows) => {
    rows.forEach((row) => {
      row.shift();
      console.log(row);
      const tempObj = {
        paperSetName: row[0],
        questionDescription: row[1],
        options: [
          {
            answerDescription: row[2],
            isCorrect: row[3]
          },
          {
            answerDescription: row[4],
            isCorrect: row[5]
          },
          {
            answerDescription: row[6],
            isCorrect: row[7]
          },
          {
            answerDescription: row[8],
            isCorrect: row[9]
          }
        ]
      };
      console.log(tempObj);
      questionAnswersObj.push(tempObj);
    });
  });

  return questionAnswersObj;
};

module.exports = {
  commonErrorHandler,
  generateRandom,
  sendResponse,
  convertExcelToJson
};
