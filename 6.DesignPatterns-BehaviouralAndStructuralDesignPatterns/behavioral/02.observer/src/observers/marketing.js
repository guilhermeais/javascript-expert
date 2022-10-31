export default class Marketing{
  update({id, username}) {
    // importante lembrar que o update é responsável por gerenciar seus errors/exceptions
    // não deve-se ter await no notify, pois a responsabilidade do notify é só emitir eventos
    console.log(`[${id}]: [marketing] will send an email to ${username}`);
  }
}