import FluentSQLBuilder from '@guilhermeais/fluentsql';
import database from './database/data.json' assert {type: "json"};

const result = FluentSQLBuilder.for(database)
  .where({ category: /^(security|developer)$/ })
 
  .groupCount('category')
  .build();

console.log(result);