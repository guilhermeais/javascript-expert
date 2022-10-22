import NotImplementedException from '../NotImplementedException.mjs';

export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name)
  }
}