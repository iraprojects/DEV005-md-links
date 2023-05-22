const { mdlinks, dir } = require('./md-links');

mdlinks(dir)
  .then((res) => {
    if (res === undefined) {
      console.log('No links found');
    } else {
      console.log('Links:', res);
    }
  })
  .catch((error) => {
    console.log('Error: invalid path ---', error);
  });
