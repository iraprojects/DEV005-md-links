const {
  searchMD, validate, readFile, getStatus,
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
