const {
  searchMD, validate, readFile, getStatus, isFile, isDirectory, getHTTPLinks,
} = require('../index');

describe('searchMD', () => {
  it('should be a function', () => {
    expect(typeof searchMD).toBe('function');
  });
  it('should return md files', () => {
    const route = 'C:/Users/kris_/Desktop/PruebasMD';
    const result = [
      'C:\\Users\\kris_\\Desktop\\PruebasMD\\otro\\holu.md',
      'C:\\Users\\kris_\\Desktop\\PruebasMD\\otro\\more files\\google.md',
      'C:\\Users\\kris_\\Desktop\\PruebasMD\\README.md',
    ];
    expect(searchMD(route)).toEqual(result);
  });
});

describe('getHTTPLinks', () => {
  it('is a function', () => {
    expect(typeof getHTTPLinks).toBe('function');
  });
  it('should return an array with the info of each link as an object (href, text, file)', () => {
    const fileRoute = 'C:/Users/kris_/Desktop/PruebasMD/otro/holu.md';
    const dataOfFile = '[Github](https://github.com/iraprojects)[Pixar](https://www.pixar.com/error404)';
    const arrayLinkInfo = [
      {
        href: 'https://github.com/iraprojects',
        text: 'Github',
        file: 'C:/Users/kris_/Desktop/PruebasMD/otro/holu.md',
      },
      {
        href: 'https://www.pixar.com/error404',
        text: 'Pixar',
        file: 'C:/Users/kris_/Desktop/PruebasMD/otro/holu.md',
      },
    ];
    expect(getHTTPLinks(dataOfFile, fileRoute)).toEqual(arrayLinkInfo);
  });
});

describe('isFiles', () => {
  it('should be a function', () => {
    expect(typeof isFile).toBe('function');
  });
});

describe('isDirectory', () => {
  it('should be a function', () => {
    expect(typeof isDirectory).toBe('function');
  });
});

describe('validate', () => {
  it('should be a function', () => {
    expect(typeof validate).toBe('function');
  });
});

describe('readFile', () => {
  it('should be a function', () => {
    expect(typeof readFile).toBe('function');
  });
});

describe('getStatus', () => {
  it('should be a function', () => {
    expect(typeof getStatus).toBe('function');
  });
});
