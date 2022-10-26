import ContextStrategy from './src/base/ContextStrategy.js';
import MongoDBStrategy from './src/strategies/MongoDBStrategy.js';
import PostgresStrategy from './src/strategies/PostgresStrategy.js';

const postgresConnectionString = 'postgres://guilherme:123456@localhost:5435/heroes'
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));

await postgresContext.connect();

const mongodbConnectionString = "mongodb://guilherme:123456@localhost:27018/heroes";
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongodbConnectionString));
await mongoDBContext.connect()

const data = [
  {
    name: 'Guilherme',
    type: 'transaction'
  },
  {
    name: 'John Doe',
    type: 'activityLog'
  }
]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext
}

for (const item of data) {
  const context = contextTypes[item.type]
  console.log(context.dbStrategy.constructor.name);
  await context.create({
    ...item,
    name: item.name + ' - ' + new Date().toISOString(),
    type: item.type
  })

  console.log(await context.read({ name: item.name }));
}