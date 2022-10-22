/**
 * ProductId: should be between 2 and 20 characters
 * Name: should be only words
 * Price: should be from zero to a thousand
 * Category: should be one of the following: electronics, books, food, clothes
 */

function productValidator(product) {
  const errors = []

  if(!(product?.id?.length >= 2 && product?.id?.length <= 20)) {
    errors.push('id: invalid length, should be between 2 and 20 characters')
  }

  const onlyWordsValidator = /(\W|\d)/
  if(onlyWordsValidator.test(product?.name)) {
    errors.push('name: invalid name, should be only words')
  }

  if(!(product?.price >= 0 && product?.price <= 1000)) {
    errors.push('price: invalid price, should be from zero to a thousand')
  }

  const validCategories = ['electronics', 'books', 'food', 'clothes']
  if(!validCategories.includes(product?.category)) {
    errors.push(`category: invalid category, should be one of the following: ${validCategories.join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

module.exports = {productValidator}