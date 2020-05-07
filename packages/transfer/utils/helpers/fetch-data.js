const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');
const Symptom = require('../../models/Symptom');
const Comment = require('../../models/Comment');

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

const fetchSymptomFromMongo = async () => {
    try {
        return await Symptom.find().lean();
    } catch (error) {
        return [];
    }
};

fetchCommentFromMongo = async () => {
    try {
        return await Comment.find().lean();
    } catch (error) {
        return [];
    }
};

module.exports = {
    fetchPatientFromMongo,
    fetchDoctorFromMongo,
    fetchSymptomFromMongo,
    fetchCommentFromMongo
}