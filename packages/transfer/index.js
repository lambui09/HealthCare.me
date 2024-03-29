require('dotenv').config();
require('./config/database/mongo');
require('./config/database/neo4j');

const {
    addSpecialistToNeo4j,
    addPatientToNeo4j,
    addDoctorToNeo4j,
    addSymptomToNeo4j,
    addCommentToNeo4j,
    addFavoriteToNeo4j,
    addAppointmentToNeo4j,
    deleteAllData
} = require('./utils/helpers');

console.log('========Transfer Service========');

(async () => {
    console.log('Start transfer data');
    await deleteAllData();
    await addPatientToNeo4j();
    await addSpecialistToNeo4j();
    await addDoctorToNeo4j();
    await addSymptomToNeo4j();
    await addCommentToNeo4j();
    await addFavoriteToNeo4j();
    await addAppointmentToNeo4j();
    console.log('Start transfer end');
})();

