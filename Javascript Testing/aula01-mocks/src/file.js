const { readFile } = require('fs/promises');
const { join } = require('path');
const { error } = require('./constants');
const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: [
    'id',
    'name',
    'profession',
    'age'
  ]
}


class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    return content 
  }

  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath);
    return (await readFile(filename)).toString()
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeaders] = csvString.split('\n')
    const isHeaderValid = header === options.fields.join(',')
    
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    } 

    const isContentLengthAccepted = (fileWithoutHeaders.length > 0 && fileWithoutHeaders.length <= options.maxLines)
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return {
      valid: true
    }
  }
}

(async () => {
  const result = await File.csvToJson('../mocks/threeItems.valid.csv')
  console.log(result);
})();