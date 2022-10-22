import TableComponent from '../../shared/base/TableComponent.mjs'

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data)
    
    document.body.insertAdjacentHTML('afterbegin', template)
  }

  prepareData(data) {
    const [firstItem] = data
    const tHeaders = Object.keys(firstItem)
      .map(text => `<th scope="col">${text}</th>`)
      .join('')

    const tRows = data
      .map(item => Object.values(item))
      .map(item => item.map(text => `<td>${text}</td>`))
      .map(item => `<tr>${item.join('')}</tr>`)

    const template = `
      <table class="table">
        <thead>
          <tr>
            ${tHeaders.join('')}
          </tr>
        </thead>
        <tbody>
          ${tRows.join('')}
        </tbody>
      </table>
    `

    return template
  }
}
