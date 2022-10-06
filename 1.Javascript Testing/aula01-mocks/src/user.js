module.exports = class User {
  constructor({name, id, profession, age}) {
    this.name = name
    this.id = parseInt(id)
    this.profession = profession
    this.birthYear = this.calculateBirthYear(parseInt(age))
  }

  calculateBirthYear(age) {
    return new Date().getFullYear() - age
  }
}