import { test, describe, jest, expect, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/BaseBusiness.js'
import { NotImplementedException } from '../src/util/exceptions'

describe('BaseBusiness', () => {
  describe('create()', () => {
    beforeEach(() => {
      jest.restoreAllMocks()
    })
    test(
      'should throw NotImplementedException ' +
        'if a child classe does not implement _validateRequiredFields',
      async () => {
        class ConcreteClasse extends BaseBusiness {
          _create() {}
        }
        const concreteClass = new ConcreteClasse()

        const promise = concreteClass.create({})

        await expect(promise).rejects.toThrow(
          new NotImplementedException('_validateRequiredFields')
        )
      }
    )

    test(
      'should throw an Error ' + 'if _validateRequiredFields returns false',
      async () => {
        class ConcreteClasse extends BaseBusiness {
          _create() {}
          _validateRequiredFields() {
            return false
          }
        }
        const concreteClass = new ConcreteClasse()

        const promise = concreteClass.create({})

        await expect(promise).rejects.toThrow(new Error('Invalid data'))
      }
    )

    test(
      'should throw NotImplementedException ' +
        'if a child classe does not implement _create',
      async () => {
        class ConcreteClasse extends BaseBusiness {
          _validateRequiredFields() {
            return true
          }
        }
        const concreteClass = new ConcreteClasse()

        const promise = concreteClass.create({})

        await expect(promise).rejects.toThrow(
          new NotImplementedException('_create')
        )
      }
    )

    test('should call _create and _validateRequiredFields on create',   async () => {
      class ConcreteClasse extends BaseBusiness {
        _validateRequiredFields = jest.fn().mockReturnValue(true)
        _create = jest.fn()
      }
      const concreteClass = new ConcreteClasse()
      jest.spyOn(BaseBusiness.prototype, 'create')
      const data = { name: 'John Doe' }
      await concreteClass.create(data)

      expect(BaseBusiness.prototype.create).toHaveBeenCalledWith(data)
      expect(concreteClass._validateRequiredFields).toHaveBeenCalledWith(data)
      expect(concreteClass._create).toHaveBeenCalledWith(data)
    })
  })
})
