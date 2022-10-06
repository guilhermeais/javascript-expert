const { readFile } = require('fs/promises');
const { join } = require('path');
const User = require('./user')
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
    const parsedToJson = File.parseCSVToJSON(content)

    return parsedToJson
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString()
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

  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\n')
    const firstLine = lines.shift()
    const header = firstLine.split(',')
    const parsedToJson = lines.map(line => {
      const columnsValues = line.split(',')
      let jsonParsed = {}
      for (const i in columnsValues) {
        jsonParsed[header[i]] = columnsValues[i]
      }

      return new User(jsonParsed)
    })

    return parsedToJson
  }
}


module.exports = File
