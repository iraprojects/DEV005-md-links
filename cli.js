const { mdlinks, dir, stats } = require('./md-links');

// const options = process.argv[3];
const options = { validate: true };

mdlinks(dir, options)
  .then((res) => {
    if (res === null) {
      console.log('No links found');
    } else if (process.argv[3] === '--stats') {
      stats(res)
        .then((ress) => console.log(ress))
        .catch((err) => console.log(err));
    } else {
      console.log('Links:', res);
    }
  })
  .catch((error) => {
    console.log('Error: invalid path ---', error);
  });
