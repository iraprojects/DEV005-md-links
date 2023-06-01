#!/usr/bin/env node
const {
  mdlinks, dir, stats, optionValidate,
} = require('./md-links');

const options = { validate: false };
mdlinks(dir, options)
  .then((res) => {
    if (res === null) {
      console.log('No links found');
    } else if (process.argv[3] === '--stats') {
      stats(res)
        .then((ress) => console.log(ress))
        .catch((err) => console.log(err));
    } else if (optionValidate(options, process.argv[3]) && process.argv[4] === '--stats') {
      stats(res)
        .then((ress) => {
          const broke = res.filter((e) => e.status !== 'OK');
          console.log(`${ress} | Broken: ${broke.length}`);
        })
        .catch((err) => console.log(err));
    } else if (!options.validate) {
      res.forEach((element) => {
        console.log(`
          href: ${element.href}
          text: ${element.text}
          file: ${element.file}
        `);
      });
    } else {
      res.forEach((element) => {
        console.log(`
          href: ${element.href}
          text: ${element.text}
          file: ${element.file}
          code: ${element.code}
          status: ${element.status}
        `);
      });
    }
  })
  .catch((error) => {
    console.log('Error: invalid path ---', error);
  });
