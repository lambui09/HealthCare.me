const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');
const Symptom = require('../../models/Symptom');
const Comment = require('../../models/Comment');
const Favorite = require('../../models/Favorite');
const Appointment = require('../../models/Appointment');
const Specialist = require('../../models/Specialist');

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

const fetchCommentFromMongo = async () => {
  try {
    return await Comment.find().lean();
  } catch (error) {
    return [];
  }
};

const fetchFavoriteFromMongo = async () => {
  try {
    return await Favorite.find().lean();
  } catch (error) {
    return [];
  }
};

const fetchAppointmentFromMongo = async () => {
  try {
    return await Appointment.find({ status: 'COMPLETED' }).lean();
  } catch (error) {
    return [];
  }
};

const fetchSpecialistFromMongo = async () => {
  try {
    return await Specialist.find().lean();
  } catch (error) {
    return [];
  }
}

module.exports = {
  fetchPatientFromMongo,
  fetchDoctorFromMongo,
  fetchSymptomFromMongo,
  fetchCommentFromMongo,
  fetchFavoriteFromMongo,
  fetchAppointmentFromMongo,
  fetchSpecialistFromMongo
}