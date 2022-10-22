import NotImplementedException from '../NotImplementedException.mjs';

export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name)
  }
}