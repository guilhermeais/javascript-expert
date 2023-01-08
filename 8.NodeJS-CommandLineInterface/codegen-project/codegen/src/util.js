export default class Util {
  static #transform({str, upperCase = true}) {
    if (!str || typeof str !== 'string') return '';
    const [first, ...rest] = str.split('');
    const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase();
    return [firstLetter, ...rest].join('');
  }
  static upperCaseFirstLetter(str) {
      return Util.#transform({str, upperCase: true});
  }
  static lowerCaseFirstLetter(str) {
      return Util.#transform({str, upperCase: false});
  }
}