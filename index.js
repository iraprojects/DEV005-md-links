/*
  cosas por hacer:
  ✔ organizar mi bolerplate
  ✔ Organizar funciones
    ✔ Normalizar ruta
    ✔ Validar si existe
    ✔ Convertir a absoluta
  ✔ Trabajar en agregar archivos md a un array
  ✔ Implementar promesa a funcion leer archivo
    ✔ implementar markdown-it para obtener links
    * utilizar fetch
  * Despues de que todo este más organizado, aventurate a testear algo
*/

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');

// const dir = 'C:/Users/kris_/Desktop/PruebasMD';
// const readme = path.resolve('README.md');

const dir = process.argv[2];
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

const getLinks = (files) => Promise.all(searchMD(files).map((file) => readFile(file)))
  .then((results) => {
    // console.log(getHTTPLinks(results, files));
    let arrObjMd = [];
    results.forEach((element) => {
      arrObjMd = arrObjMd.concat(element);
    });
    console.log(arrObjMd);
  })
  .catch((error) => {
    console.error(error);
  });

const routeExists = (route) => {
  fs.stat(route, (err) => {
    if (err === null) {
      console.log('Path exists yeah!');
      console.log('Archivos con extensión .md:', searchMD(route));
      console.log('Read files: ', getLinks(route));
    } else if (err.code === 'ENOENT') {
      console.log('File or directory no exist :c');
    } else {
      console.log('Some other error: ', err.code);
    }
  });
};
routeExists(dir);
module.exports = () => {

};
