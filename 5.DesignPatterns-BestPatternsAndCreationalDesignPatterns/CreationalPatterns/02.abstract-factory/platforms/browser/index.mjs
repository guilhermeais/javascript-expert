import ViewFactory from '../../shared/base/ViewFactory.mjs'
import TableBrowserComponent from './table.mjs'

export default class BrowserFactory extends ViewFactory {
  createTable() {
    return new TableBrowserComponent()
  }
}