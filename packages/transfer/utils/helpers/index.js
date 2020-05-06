const {fetchPatientFromMongo, fetchDoctorFromMongo} = require("./fetch-data");

const { driver } = require('../../config/database/neo4j');

const addPatientToNeo4j = async () => {
    console.log('Start transfer Patient...');
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

const addDoctorToNeo4j = async () => {
    console.log('Start transfer Doctor...');
    const session = driver.session();
    const txc = session.beginTransaction()
    try {
        const doctors = await fetchDoctorFromMongo();
        for (const item of doctors) {
            const queryStr = `
                MERGE (doctor:Doctor {
                    _id: $_id
                })
                ON CREATE SET
                    doctor.first_name=$first_name,
                    doctor.last_name=$last_name,
                    doctor.address=$address,
                    doctor.location=point({latitude:toFloat($latitude),longitude:toFloat($longitude)})
                ON MATCH SET
                    doctor.first_name=$first_name,
                    doctor.last_name=$last_name,
                    doctor.address=$address,
                    doctor.location=point({latitude:toFloat($latitude),longitude:toFloat($longitude)})
                RETURN doctor.first_name as first_name
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
        console.log('Transfer Doctor Success! Total: ' + doctors.length);
    } catch (e) {
        await txc.rollback()
        console.log(e);
        console.log('Transfer Doctor failed!');
    } finally {
        await session.close()
    }
};


module.exports = {
    addPatientToNeo4j,
    addDoctorToNeo4j
}