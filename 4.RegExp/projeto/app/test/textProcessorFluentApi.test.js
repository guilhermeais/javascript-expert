const { describe, test } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')
const { makeValidText } = require('./mock/valid-text')
describe('TextProcessorFluentAPI', () => {
  describe('build()', () => {
    test('should return the content ', () => {
      const textMocked = makeValidText()
      const result = new TextProcessorFluentAPI(textMocked).build()
      expect(result).to.be.deep.equal(textMocked)
    })
  })

  describe('extractPeopleData()', () => {
    test('should extract the people data from the text', () => {
      const textMocked = makeValidText()
      const result = new TextProcessorFluentAPI(textMocked)
        .extractPeopleData()
        .build()

      const expectedResult = [
        [
          'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e',
          'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo.',
        ].join('\n'),
        [
          'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e',
          'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo.',
        ].join('\n'),
      ]
      expect(result).to.be.deep.equal(expectedResult)
    })
  })

  describe('divideTextInColumns()', () => {
    const content = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo.',
      ].join('\n'),
    ]

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build()
    const expected = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo.',
      ],
    ]

    expect(result).to.be.deep.equal(expected)
  })

  describe('removeEmptyCharacters()', () => {
    test('should remove all empty characters', () => {
      const content = [
        [
          'Xuxa da Silva',
          ' brasileira',
          ' casada',
          ' CPF 235.743.420-12',
          ' residente e \ndomiciliada a Rua dos bobos',
          ' zero',
          ' bairro Alphaville',
          ' São Paulo.',
        ],
      ]
      const result = new TextProcessorFluentAPI(content)
        .removeEmptyCharacters()
        .build()

      const expected = [
        [
          'Xuxa da Silva',
          'brasileira',
          'casada',
          'CPF 235.743.420-12',
          'residente e domiciliada a Rua dos bobos',
          'zero',
          'bairro Alphaville',
          'São Paulo.',
        ],
      ]

      expect(result).to.be.deep.equal(expected)
    })
  })

  describe('mapPerson()', () => {
    const content = [
      [
        'Xuxa da Silva',
        'brasileira',
        'casada',
        'CPF 235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.',
      ],
    ]

    const result = new TextProcessorFluentAPI(content)
    .mapPerson()
    .build()

    const expected = [
      {
        name: 'Xuxa da Silva',
        nationality: 'Brasileira',
        civilStatus: 'Casada',
        document: {
          cpf: '23574342012',
        },
        address: {
          street: 'Rua dos bobos',
          number: 'zero',
          neighborhood: 'Alphaville',
          city: 'São Paulo',
        }
      }
    ]

    expect(result).to.be.deep.equal(expected)
  });
})
