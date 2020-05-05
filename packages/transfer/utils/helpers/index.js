const { driver } = require('../../config/database/neo4j');
const Patient = require('../../models/Patient');

const fetchPatientFromMongo = async () => {
    try {
        return await Patient.find().lean();
    } catch (error) {
       return [];
    }
};

const addPatientToNeo4j = async () => {
    const session = driver.session();
    const txc = session.beginTransaction()
    try {
        const patients = await fetchPatientFromMongo();
        for (const item of patients) {
            const queryStr = `
                MERGE (patient:Patient {
                    _id: $_id
                })
                ON CREATE SET
                    patient.first_name=$first_name,
                    patient.last_name=$last_name,
                    patient.address=$address,
                    patient.location=point({latitude:toFloat($latitude),longitude:toFloat($longitude)})
                ON MATCH SET
                    patient.first_name=$first_name,
                    patient.last_name=$last_name,
                    patient.address=$address,
                    patient.location=point({latitude:toFloat($latitude),longitude:toFloat($longitude)})
                RETURN patient.first_name as first_name
                `;

            await txc.run(queryStr, {
                _id: item._id.toString(),
                first_name: item.first_name || '',
                last_name: item.last_name || '',
                address: item.address || '',
                longitude: item.location && item.location.coordinates[0] ? item.location.coordinates[0] : -1,
                latitude: item.location && item.location.coordinates[1] ? item.location.coordinates[1] : -1,
            });
        }

        await txc.commit();
        console.log('Transfer Patient Success! Total: ' + patients.length);
    } catch (e) {
        await txc.rollback()
        console.log(e);
        console.log('Transfer Patient failed!');
    } finally {
        await session.close()
    }
};

module.exports = {
    addPatientToNeo4j,
}