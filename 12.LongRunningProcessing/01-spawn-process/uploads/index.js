import { spawn } from 'child_process'
const pythonFile = 'index.py'
const pythonCommand = 'python3'

async function requestPython({ url, headers, filepath }) {
  const py = spawn(pythonCommand, [
    pythonFile,
    JSON.stringify({
      url,
      headers,
      filepath,
    }),
  ])

  const dataString = []

  for await (const data of py.stdout) {
    dataString.push(data.toString())
  }

  return dataString.join('\n')
}

const result = await requestPython({
  url: 'http://localhost:3000',
  filepath: 'my-data.csv',
  headers: {
    'Content-Type': 'text/csv',
  }
})

console.log(result)
