const { expect } = require('chai');
const { describe, test } = require('mocha');
const Person = require('../src/person');

describe('Person', () => {
  test('should generate a person instance from properties list', () => {
    const content =  [
      'Xuxa da Silva',
      'brasileira',
      'casada',
      'CPF 235.743.420-12',
      'residente e domiciliada a Rua dos bobos',
      'zero',
      'bairro Alphaville',
      'São Paulo.',
    ];

    const person = Person.fromList(content);
    const expected = {
      name: 'Xuxa da Silva',
      nationality: 'Brasileira',
      civilStatus: 'Casada',
      document: {
        'cpf': '23574342012'
      },
      address: {
        street: 'Rua dos bobos',
        number: 'zero',
        neighborhood: 'Alphaville',
        city: 'São Paulo'
      }
    }

    expect(person).to.be.deep.equal(expected);
  });
});