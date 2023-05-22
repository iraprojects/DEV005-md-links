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

/* let arrObjMd = [];
    results.forEach((element) => {
      arrObjMd = arrObjMd.concat(element);
    }); */ // mi codigo sin refactorizar
// const arrObjMd = results.flatMap((element) => element); // ES2019
/* const getLinks = (files) => Promise.all(searchMD(files).map((file) => readFile(file)))
  .then((results) => {
    const arrObjMd = [].concat(...results); // ES6
    console.log(validate(arrObjMd));
  })
  .catch((error) => {
    console.error(error);
  });

const routeExists = (route) => {
  fs.stat(route, (err) => {
    if (err === null) {
      return getLinks(route);
    }
    return console.log('Path no exist :c');
  });
}; */

module.exports = {
  dir,
  validate,
  searchMD,
  readFile,
};
