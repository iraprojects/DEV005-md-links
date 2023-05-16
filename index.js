/* 
  cosas por hacer:
  ✔ organizar mi bolerplate 
  * Organizar funciones
    * Normalizar ruta
    * Validar si existe
    * Convertir a absoluta
  * Trabajar en agregar archivos md a un array
  * Despues de que todo este más organizado, aventurate a testear algo
*/

const fs = require('fs');
const path = require('path');

//__dirname == es siempre el directorio del archivo actual.
const dir = 'C:/Users/kris_/Documents/5-P R O Y E C T O S/Data-Lovers_Project/DEV005-data-lovers'
const file = 'README.md'
const files = fs.readdirSync(dir);

let x = path.normalize('C:\Users\kris_\Documents\5-P R O Y E C T O S\Data-Lovers_Project');

console.log('Normalizada: ',x);

// convertir a absoluta la ruta dada
const filePath = path.resolve(file); // resuelve un archivo
const absolute = path.resolve(dir); // resuelve un directorio
console.log('Ruta absoluta:', filePath);

fs.statSync(dir, function (err, stats) { // comprueba que exista la ruta o archivo
  console.log(`Is file: ${stats.isFile()}`); // comprueba si es directorio
  console.log(`Is directory: ${stats.isDirectory()}`);
  if (err == null) {
    console.log('File or directory exists yeah!');
  } else if (err.code === 'ENOENT') {
    console.log('File or directory no exist :c');
  } else {
    console.log('Some other error: ', err.code);
  }
});

// validamos si la ruta es absoluta o no
console.log(path.isAbsolute(__dirname)); // true
console.log(path.isAbsolute(absolute)); // true
console.log(path.isAbsolute(file)); // false
console.log(path.isAbsolute(filePath)); // true ?

/* const readingFile = ((file) => {
  fs.readFile(file, 'utf-8', (error, data) => {
    if (error) throw error;
    console.log('\nReading file:');
    console.log(data,'\n');
  })
}) */

console.log("\nFilenames with the .md extensions:");;
files.forEach(file => {
  if (path.extname(file) === '.md') {
    console.log('File: ', file);
    console.log('Path: ', absolute);
    console.log('Extension: ', path.extname(file));
    console.log('Absolute Path: ', path.join(absolute, file));
    // readingFile(path.join(absolute, file));
  };
});

/* fs.readFile('file.txt', 'utf-8', (error, data) => {
  if (error) throw error;
  console.log(data,'\n');
}) */

module.exports = () => {

};
