const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');

const fetchPatientFromMongo = async () => {
    try {
        return await Patient.find().lean();
    } catch (error) {
        return [];
    }
};

const fetchDoctorFromMongo = async () => {
    try {
        return await Doctor.find().lean();
    } catch (error) {
        return [];
    }
};

module.exports = {
    fetchPatientFromMongo,
    fetchDoctorFromMongo
}