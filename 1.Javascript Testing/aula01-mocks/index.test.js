const { rejects, deepStrictEqual } = require('assert');
const { error } = require('./src/constants');
const File = require('./src/file');

(async () => {
  {
    const filePath = './mocks/emptyFile.invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/fourItems.invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/threeItems.valid.csv'
    
    const expected = [
      {
        "name": "Guilherme",
        "id": 123,
        "profession": "Software Developer",
        "birthYear": 2003
      },
      {
        "name": "João Paulo",
        "id": 23,
        "profession": "Apresentador",
        "birthYear": 1992
      },
      {
        "name": "Pedro Alves",
        "id": 12,
        "profession": "Programador",
        "birthYear": 2002
      }
    ]
    const result = await File.csvToJson(filePath)
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})();