import TableComponent from '../../shared/base/TableComponent.mjs';
import chalk from 'chalk';
import chalkTable from 'chalk-table'
export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data)
    const options = {
      leftPad: 2,
      columns
    }

    const table = chalkTable(options, data)
    console.log(table)
  }

  prepareData(data) {
    const [firstItem] = data
    const headers = Object.keys(firstItem)
    function formatHeader(data, index) {
      return index % 2 === 0 ? chalk.yellow(data) : chalk.green(data)
    }
    const columns = headers.map((header, index) => ({
      field: header,
      name: formatHeader(header, index)
    }))

    return columns
  }
}