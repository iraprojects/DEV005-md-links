const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');

// node index.js 'C:/Users/kris_/Desktop/PruebasMD';
// node index.js 'README.md';
// node index.js C:/Users/kris_/Desktop/FolderNofiles

const dir = process.argv[2].replace(/\\/g, '/');
const toAbsolute = (route) => path.resolve(route);
const isFile = (route) => fs.statSync(route).isFile();
const isDirectory = (route) => fs.statSync(route).isDirectory();
const extensionMD = (route) => path.extname(route) === '.md';

const searchMD = (route) => {
  let mdFiles = [];
  if (isFile(route) && extensionMD(route)) {
    const absolute = toAbsolute(route);
    mdFiles.push(absolute);
  } else if (isDirectory(route)) {
    const elements = fs.readdirSync(route);
    elements.forEach((element) => {
      const newRoute = path.join(route, element);
      const newAbsolute = toAbsolute(newRoute);
      mdFiles = mdFiles.concat(searchMD(newAbsolute));
    });
  }
  return mdFiles;
};

const getHTTPLinks = (data, file) => {
  const newArray = [];
  const md = new MarkdownIt();
  const htmlContent = md.render(data);
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href.startsWith('http')) {
      newArray.push({
        href,
        text: link.textContent,
        file,
      });
    }
  });
  return newArray;
};

const readFile = ((file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf-8', (error, data) => {
    if (error) reject(error);
    resolve(getHTTPLinks(data, file));
  });
}));

const validate = (obj) => {
  if (Object.entries(obj).length === 0) {
    return console.log('Not links');
  }
  return obj;
};

const responseStatus = ((arr) => {
  const fetchPromises = arr.map((e) => fetch(e.href)
    .then((response) => {
      if (response.ok) {
        return ({
          href: e.href, file: e.file, text: e.text, code: response.status, status: 'ok',
        });
      }
      return ({
        href: e.href, file: e.file, text: e.text, code: response.status, status: 'fail',
      });
    })
    .catch((error) => console.log(`Error with the fetch request:${error.message}`)));
  return Promise.all(fetchPromises);
});

/* const getStatus = ((arr) => {
  responseStatus(arr)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}); */

const getStatus = (arr) => new Promise((resolve, reject) => {
  responseStatus(arr)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
});

const optionValidate = ((arr, options) => {
  if (options === '--validate') {
    return getStatus(arr);
  }
  return validate(arr);
});

module.exports = {
  dir,
  validate,
  searchMD,
  readFile,
  getStatus,
  isFile,
  isDirectory,
  getHTTPLinks,
  optionValidate,
};
