import ViewFactory from '../../shared/base/ViewFactory.mjs'
import TableConsoleComponent from './table.mjs'

export default class ConsoleFactory extends ViewFactory {
  createTable() {
    return new TableConsoleComponent()
  }
}