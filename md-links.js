// const fs = require('fs');
const {
  dir, searchMD, readFile, validate,
} = require('./index');

const mdlinks = (path) => new Promise((resolve, reject) => {
  Promise.all(searchMD(path).map((file) => readFile(file)))
    .then((results) => {
      const arrObjMd = [].concat(...results);
      resolve(validate(arrObjMd));
    })
    .catch((error) => {
      console.log(':c', error);
      reject(error);
    });
});

module.exports = {
  mdlinks,
  dir,
};
