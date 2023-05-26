const { mdlinks, dir } = require('./md-links');
// const { getStatus } = require('./index');
const options = process.argv[3];

mdlinks(dir, options)
  .then((res) => {
    if (res === null) {
      console.log('No links found');
    } else {
      console.log('Links:', res);
    }
  })
  .catch((error) => {
    console.log('Error: invalid path ---', error);
  });
