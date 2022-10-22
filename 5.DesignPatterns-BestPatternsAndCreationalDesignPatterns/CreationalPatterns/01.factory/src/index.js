const UserFactory = require('./factory/UserFactory');

;(async () => {
  const userFactory = await UserFactory.createUserServiceInstance()
  const result = await userFactory.find({name: 'John Doe'})
  console.log(result)
})()