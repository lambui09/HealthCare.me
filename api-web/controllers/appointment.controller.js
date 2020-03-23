const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const validateTour = require('../validationUtils/appointment');
const validateCreateAppointment = validateTour.createAppointment;
/**
 * router: api/v1/appointments
 * */
const createAppointment = async (req, res) => {



};
