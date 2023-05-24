const { mdlinks, dir } = require('./md-links');
const { getStatus } = require('./index');

mdlinks(dir)
  .then((res) => {
    if (res === undefined) {
      console.log('No links found');
    } else {
      console.log('Links:', res);
      getStatus(res);
    }
  })
  .catch((error) => {
    console.log('Error: invalid path ---', error);
  });
