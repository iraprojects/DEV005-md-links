const {
  searchMD, validate, readFile, getStatus, isFile, isDirectory, toAbsolute, getHTTPLinks, stats, optionValidate,
} = require('../functions');

describe('toAbsolute', () => {
  it('should be a function', () => {
    expect(typeof searchMD).toBe('function');
  });
  it('should convert relative path to absolute path', () => {
    const relative = 'README.md';
    expect(toAbsolute(relative)).toBe('C:\\Users\\kris_\\Desktop\\DEV005-md-links\\README.md');
  });
});

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
  it('should return a object', () => {
    const obj = { file: 'README.md' };
    expect(validate(obj)).toBe(obj);
  });
  it('should return "Not links"', () => {
    const obj = {};
    expect(validate(obj)).toBe(console.log('Not links'));
  });
});

describe('readFile', () => {
  it('should be a function', () => {
    expect(typeof readFile).toBe('function');
  });
  const file = 'C:/Users/kris_/Desktop/PruebasMD/otro/more files/google.md';
  const result = [{ file: 'C:/Users/kris_/Desktop/PruebasMD/otro/more files/google.md', href: 'https://google.com', text: 'Google' }];
  it('should resolve function getHTTPLinks', () => readFile(file).then((data) => {
    expect(data).toEqual(result);
  }));
});

describe('getStatus', () => {
  it('should be a function', () => {
    expect(typeof getStatus).toBe('function');
  });
  global.fetch = jest.fn(() => Promise.resolve({ status: 200, statusText: 'OK' }));
  const mockData = [
    {
      file: 'C:/Users/kris_/Desktop/PruebasMD/otro/holu.md',
      href: 'https://github.com/iraprojects',
      text: 'Github',
      code: 200,
      status: 'OK',
    },
  ];
  const arr = [
    {
      file: 'C:/Users/kris_/Desktop/PruebasMD/otro/holu.md',
      href: 'https://github.com/iraprojects',
      text: 'Github',
    },
  ];

  it('returns an array with the validation info (status, statusText)', () => getStatus(arr).then((data) => {
    expect(data).toEqual(mockData);
  }));
});

describe('optionValidate', () => {
  it('should be a function', () => {
    expect(typeof optionValidate).toBe('function');
  });
  const arg = '--validate';
  const options = { validate: false };
  it('should return true', () => {
    expect(optionValidate(options, arg)).toBe(true);
  });
  it('should return false', () => {
    expect(optionValidate(options, '--mock')).toBe(false);
  });
});

describe('stats', () => {
  it('should be a function', () => {
    expect(typeof stats).toBe('function');
  });
  const arr = [
    {
      file: 'C:/Users/kris_/Desktop/PruebasMD/otro/holu.md',
      href: 'https://github.com/iraprojects',
      text: 'Github',
    },
  ];
  const result = ('Total: 1 | Unique: 1');
  it('should resolve stats', () => stats(arr).then((data) => {
    expect(data).toEqual(result);
  }));
});
