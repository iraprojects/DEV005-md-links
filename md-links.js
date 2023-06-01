const {
  dir, searchMD, readFile, optionValidate, stats, getStatus, validate,
} = require('./functions');

const arg = process.argv[3];

const mdlinks = (path, options) => new Promise((resolve, reject) => {
  Promise.all(searchMD(path).map((file) => readFile(file)))
    .then((results) => {
      const arrObjMd = [].concat(...results);
      if (optionValidate(options, arg)) resolve(getStatus(arrObjMd));
      resolve(validate(arrObjMd));
    })
    .catch((error) => {
      console.log('Error', error);
      reject(error);
    });
});

module.exports = {
  mdlinks,
  dir,
  stats,
  optionValidate,
};

/*
podrías probar expect(error).rejects.toEqual(ejemplo) */
