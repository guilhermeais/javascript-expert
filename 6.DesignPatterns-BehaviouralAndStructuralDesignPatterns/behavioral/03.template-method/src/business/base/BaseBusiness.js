import { NotImplementedException } from '../../util/exceptions';

export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name)
  }

  async _create(data) {
    throw new NotImplementedException(this._create.name)

  }

  /**
   * Padrão do Martin Fowler
   * A proposta é garantir um fluxo de métodos, definindo uma sequência a ser executada
   * 
   * Esse create é a implementação do padrão Template Method
   */
  async create(data) {
    const isValid = this._validateRequiredFields(data);
    if (!isValid) {
      throw new Error('Invalid data');
    }

    return this._create(data);
  }
}