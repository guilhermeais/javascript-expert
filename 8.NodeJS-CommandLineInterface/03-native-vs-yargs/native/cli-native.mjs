const [ , , ...args] = process.argv

function parseArguments(rawArgs) {
  const argsMap = new Map()
  const commandPrefix = '--'
  for (const key in rawArgs) {
    const index = parseInt(key)
    const argKey = rawArgs[index]
    if (!argKey.startsWith(commandPrefix)) {
      continue
    }

    const argValue = rawArgs[index + 1]
    argsMap.set(argKey.replace(commandPrefix, ''), argValue)
  }

  return Object.fromEntries(argsMap)
}

const argsMap = parseArguments(args)
console.log(argsMap)
