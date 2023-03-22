import database from '../database.js'
import Cart from './entities/cart.js'
import Product from './entities/product.js'

const cart = new Cart(database)
console.log(cart);
/**
 * Caso de uso: a propriedade `tmpProperty` é uma propriedade legada que não vem mais nada, nosso objetivo é remover ela.
 * Outro detalhe é setar a propriedade `activePromoId` para `0` caso ela seja `undefined` ou `null`.
 * Outro, é calcular o preço total do carrinho.
 */