const { describe, test } = require('mocha')
const { expect } = require('chai')
const { evaluateRegex, InvalidRegexError } = require('./../src/utils')

describe('Util', () => {
  describe('evaluateRegex()', () => {
    test('should throw an error using an unsafe regex', () => {
      const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
      
      expect(() => evaluateRegex(unsafeRegex)).to.throw(
        InvalidRegexError,
        `This exp (${unsafeRegex}) is not a valid regex`
      )
    })

    test('should not throw an error using a safe regex', () => {
      const safeRegex = /^([a-z])$/
      expect(() => evaluateRegex(safeRegex)).to.not.throw(
        InvalidRegexError,
        `This exp (${safeRegex}) is not a valid regex`
      )

      expect(evaluateRegex(safeRegex)).to.be.ok
    })
  })
})
