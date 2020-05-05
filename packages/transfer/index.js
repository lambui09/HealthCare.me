require('dotenv').config();
require('./config/database/mongo');
require('./config/database/neo4j');

const { addPatientToNeo4j } = require('./utils/helpers');

console.log('========Transfer Service========');

(async () => {
    console.log('Start transfer data');
    await addPatientToNeo4j();
    console.log('Start transfer end');
})();

