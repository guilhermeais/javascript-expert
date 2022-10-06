import { describe, test } from 'mocha'
import {expect} from 'chai'
import Person from '../src/person.js'

describe('Person', () => {
  describe('generateInstanceFromString()', () => {
    test('should return a person instance from a string', () => {
      const person = Person.generateInstanceFromString(
        '1 Car,Boat 100 2020-01-01 2020-01-01'
      )
      expect(person).to.be.deep.equal({
        id: '1',
        vehicles: ['Car', 'Boat'],
        kmTraveled: '100',
        from: '2020-01-01',
        to: '2020-01-01',
      })
    })
  })

  describe('formatted()', () => {
    test('should format the values', () => {
      const person = new Person({
        id: '1',
        vehicles: ['Car', 'Boat'],
        kmTraveled: '100',
        from: '2020-01-01',
        to: '2020-01-01',
      })
  
      const result = person.formatted("pt-BR")
      const expected = {
        id: 1,
        vehicles: 'Car e Boat',
        kmTraveled: '100 km',
        from: '01 de janeiro de 2020',
        to: '01 de janeiro de 2020'
      }

      expect(result).to.be.deep.equal(expected)
    });
  })
})
