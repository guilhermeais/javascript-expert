import database from '../database.json' assert { type: 'json' }
import Person from './person'
import { save } from './repository'
import TerminalController from './terminalController'

const DEFAULT_LANG = 'pt-BR' 
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question('What??\n')

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log('Process finished!');
      return;
    }

    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    save(person)
    return mainLoop()
  } catch (error) {
    console.error('Some error has ocurred: ', error);
    return mainLoop()
  }
}

await mainLoop()