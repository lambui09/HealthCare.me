const {fetchPatientFromMongo, fetchDoctorFromMongo, fetchSymptomFromMongo, fetchCommentFromMongo,
    fetchFavoriteFromMongo,
    fetchAppointmentFromMongo,
    fetchSpecialistFromMongo,
} = require("./fetch-data");

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

const addSpecialistToNeo4j = async () => {
    console.log('Start transfer Specialist...');
    const session = driver.session();
    const txc = session.beginTransaction()
    try {
        const specialist = await fetchSpecialistFromMongo();
        for (const item of specialist) {
            const queryStr = `
                MERGE (specialist:Specialist {
                    _id: $_id
                })
                ON CREATE SET
                    specialist.name = $name
                ON MATCH SET
                    specialist.name = $name
                RETURN specialist.name as name
                `;

            await txc.run(queryStr, {
                _id: item._id.toString(),
                name: item.name || ''
            });
        }

        await txc.commit();
        console.log('Transfer Specialist Success! Total: ' + specialist.length);
    } catch (e) {
        await txc.rollback()
        console.log(e);
        console.log('Transfer Specialist failed!');
    } finally {
        await session.close()
    }
}

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
                WITH doctor
                MATCH(specialist: Specialist {
                    _id: $specialist
                })
                MERGE(doctor)-[r:HAS_SPECIALIST]-(specialist)
                RETURN doctor.first_name as first_name
                `;

            await txc.run(queryStr, {
                _id: item._id.toString(),
                first_name: item.first_name || '',
                last_name: item.last_name || '',
                address: item.address || '',
                longitude: item.location && item.location.coordinates[0] ? item.location.coordinates[0] : -1,
                latitude: item.location && item.location.coordinates[1] ? item.location.coordinates[1] : -1,
                specialist: item.specialist.toString(),
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

const addSymptomToNeo4j = async () => {
    console.log('Start transfer Symptom...');
    const session = driver.session();
    const txc = session.beginTransaction()
    try {
        const symptoms = await fetchSymptomFromMongo();
        for (const item of symptoms) {
            const queryStr = `
                MERGE (symptom:Symptom {
                    _id: $_id
                })
                ON CREATE SET
                    symptom.name=$name
                ON MATCH SET
                    symptom.name=$name
                RETURN symptom.name as name
                `;

            await txc.run(queryStr, {
                _id: item._id.toString(),
                name: item.name || ''
            });
        }

        await txc.commit();
        console.log('Transfer Symptom Success! Total: ' + symptoms.length);
    } catch (e) {
        await txc.rollback()
        console.log(e);
        console.log('Transfer Symptom failed!');
    } finally {
        await session.close()
    }
}

const addCommentToNeo4j = async () => {
    console.log('Start transfer Comment...');
    const session = driver.session();
    const txc = session.beginTransaction()
    try {
        const comments = await fetchCommentFromMongo();
        for (const item of comments) {
            const queryStr = `
                MATCH (patient:Patient {
                    _id:$commenter
                })
                MATCH (doctor:Doctor {
                    _id:$doctor
                })
                MERGE (doctor)<-[r:INTERACTIVE]-(patient)
                ON MATCH SET r.score=r.score + $scoreRated
                ON CREATE SET r.score=$scoreRated
                `;

            await txc.run(queryStr, {
                commenter: item.commenter.toString(),
                doctor: item.doctor.toString(),
                scoreRated: item.rate_star * 5 / 5,
            });
        }

        await txc.commit();
        console.log('Transfer Comment Success! Total: ' + comments.length);
    } catch (e) {
        await txc.rollback()
        console.log(e);
        console.log('Transfer Comment failed!');
    } finally {
        await session.close()
    }
}

const addFavoriteToNeo4j = async () => {
    console.log('Start transfer Favorite...');
    const session = driver.session();
    const txc = session.beginTransaction()
    try {
        const favorites = await fetchFavoriteFromMongo();
        for (const item of favorites) {
            const queryStr = `
                MATCH (patient:Patient {
                    _id:$favorite_personal
                })
                MATCH (doctor:Doctor {
                    _id:$doctor
                })
                MERGE (doctor)<-[r:INTERACTIVE]-(patient)
                ON MATCH SET r.score=r.score + $scoreFavorited
                ON CREATE SET r.score=$scoreFavorited
                `;

            await txc.run(queryStr, {
                favorite_personal: item.favorite_personal.toString(),
                doctor: item.doctor.toString(),
                scoreFavorited: 1,
            });
        }

        await txc.commit();
        console.log('Transfer Favorite Success! Total: ' + favorites.length);
    } catch (e) {
        await txc.rollback()
        console.log(e);
        console.log('Transfer Favorite failed!');
    } finally {
        await session.close()
    }
}

const addAppointmentToNeo4j = async () => {
    console.log('Start transfer Appointment...');
    const session = driver.session();
    const txc = session.beginTransaction()
    try {
        const appointments = await fetchAppointmentFromMongo();
        for (const item of appointments) {
            const symptoms = item.symptom_list;
            for (let item_id of symptoms) {
                const queryStr = `
                    MATCH (patient:Patient {
                        _id:$patient
                    })
                    MATCH (doctor:Doctor {
                        _id:$doctor
                    })
                    MATCH (symptom:Symptom {
                        _id:$symptom
                    })
                    MERGE (symptom)<-[r:BOOKED_WITH]-(patient)
                    ON MATCH SET r.score=$scoreBooked
                    ON CREATE SET r.score=$scoreBooked
                    MERGE (symptom)<-[r1:IS_BOOKED_WITH]-(doctor)
                    ON MATCH SET r1.score=$scoreBooked
                    ON CREATE SET r1.score=$scoreBooked
                `;

                await txc.run(queryStr, {
                    patient: item.patient_id.toString(),
                    doctor: item.doctor_id.toString(),
                    scoreBooked: 2,
                    symptom: item_id,
                });
            }

            const queryInteractive = `
                    MATCH (patient:Patient {
                        _id:$patient
                    })
                    MATCH (doctor:Doctor {
                        _id:$doctor
                    })
                    MERGE (doctor)<-[r2:INTERACTIVE]-(patient)
                    ON MATCH SET r2.score=r2.score + $scoreBooked
                    ON CREATE SET r2.score=$scoreBooked
                 `;

            await txc.run(queryInteractive, {
                patient: item.patient_id.toString(),
                doctor: item.doctor_id.toString(),
                scoreBooked: 2,
            });
        }

        await txc.commit();
        console.log('Transfer Appointment Success! Total: ' + appointments.length);
    } catch (e) {
        await txc.rollback()
        console.log(e);
        console.log('Transfer Appointment failed!');
    } finally {
        await session.close()
    }
}

const deleteAllData = async () => {
    console.log('Delete All Data...');
    const session = driver.session();
    const txc = session.beginTransaction()
    try {
        const queryStr = `
            MATCH (n) DETACH DELETE n
        `;

        await txc.run(queryStr, {});
        await txc.commit();
        console.log('Delete Success!');
    } catch (e) {
        await txc.rollback()
        console.log(e);
        console.log('Delete failed!');
    } finally {
        await session.close()
    }
};

module.exports = {
    addPatientToNeo4j,
    addSpecialistToNeo4j,
    addDoctorToNeo4j,
    addSymptomToNeo4j,
    addCommentToNeo4j,
    addFavoriteToNeo4j,
    addAppointmentToNeo4j,
    deleteAllData
}