import { 
  expect, 
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals';
import Util from '../../src/util';

describe('#Utils - String', () => {
  const componentName = 'product'
  const repositoryName = `${componentName}Repository`
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })


  test('#uppercaseFirstLetter should transform the first letter to uppercase', () => {
    const string = 'hello'
    const expected = 'Hello'
    const result = Util.upperCaseFirstLetter(string)
    expect(result).toBe(expected)
  });

  test('#lowercaseFirstLetter should transform the first letter to lowercase', () => {
    const string = 'Hello'
    const expected = 'hello'
    const result = Util.lowerCaseFirstLetter(string)
    expect(result).toBe(expected)
  });

  test('#lowercaseFirstLetter given an empty string it should return empty', () => {
    const string = ''
    const expected = ''
    const result = Util.lowerCaseFirstLetter(string)
    expect(result).toBe(expected)
  });
  test('#uppercaseFirstLetter given an empty string it should return empty', ()=> {
    const string = ''
    const expected = ''
    const result = Util.upperCaseFirstLetter(string)
    expect(result).toBe(expected)
  });

});