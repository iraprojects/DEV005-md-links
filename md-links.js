const {
  dir, searchMD, readFile, optionValidate, stats,
} = require('./index');

const mdlinks = (path, options) => new Promise((resolve, reject) => {
  Promise.all(searchMD(path).map((file) => readFile(file)))
    .then((results) => {
      const arrObjMd = [].concat(...results);
      resolve(optionValidate(arrObjMd, options));
    })
    .catch((error) => {
      console.log(':c', error);
      reject(error);
    });
});

module.exports = {
  mdlinks,
  dir,
  stats,
};
