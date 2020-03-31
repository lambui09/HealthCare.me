const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
// const validateAppointment = require('../validationUtils/appointment');
// const validateCreateAppointment = validateAppointment.createAppointment;
/**
 * router: api/v1/appointments
 * */
const createAppointment = async (req, res) => {
    const date = new Date().now;
    console.log(req);
    const newAppointment = new Appointment({
        owner: req.user.id,
    });
    newAppointment.duration_appointment = req.body.duration_appointment;
    newAppointment.price = req.body.price;
    newAppointment.date = req.body.date;
    newAppointment.status = req.body.status;
    newAppointment.time_remainder_send_notification = req.body.time_remainder_send_notification;
    console.log(newAppointment);
    let appointmentCreated = null;
    try {
        appointmentCreated = await newAppointment.save();
    } catch (error) {
        console.error = 'Can not create new appointment. Please try again later';
        return res.status(500).json(
            {
                success: false,
                errors,
            }
        )
    }
    if (!appointmentCreated) {
        errors.error = 'Can not create new appointment. Please try again later';
        return res.status(400).json(
            {
                success: false,
                errors,
            }
        )
    }
    console.log(appointmentCreated);
    return res.status(200).json({
        success: true,
        data: {
            appointment: appointmentCreated,
        }
    })
};

const updateAppointment = async (req, res) => {

};
module.exports = {
    createAppointment,
};
