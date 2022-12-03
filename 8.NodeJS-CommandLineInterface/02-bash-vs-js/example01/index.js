const { existsSync, mkdirSync, rmSync } = require('fs')
const { execSync } = require('child_process')

function getFileName(index) {
  return index >= 3 ? `js-0${index}` : `mjs-0${index}`
}

function rmFolder(folderName) {
  rmSync(`./${folderName}`, { recursive: true })
}

function makeDir(folderName) {
  if (existsSync(folderName)) {
    rmFolder(folderName)
  }

  mkdirSync(folderName)

  return folderName
}

function initializePackage(folderName) {
  execSync(`npm init -y --scope @guilhermeais --silent`, {
    cwd: `./${folderName}`,
  })

  return folderName
}

function printNameAndPackageVersion(folderName) {
  const { name, version } = require(`./${folderName}/package.json`)
  console.log({
    name,
    version,
  })

  return folderName
}

const FOLDER_AMOUNT = 4
Array.from(new Array(FOLDER_AMOUNT).keys())
  .map(index => makeDir(getFileName(index + 1)))
  .map(initializePackage)
  .map(printNameAndPackageVersion)
  .map(rmFolder)
