const _ = require('lodash');
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
// const validateAppointment = require('../validationUtils/appointment');
// const validateCreateAppointment = validateAppointment.createAppointment;

/**
 * Of Patient
 * router: api/v1/appointments
 * //commenet het vao day nhe:
 *
 * hehe
 * GetWorkingTime: cai ni ly ra gio lam cua docto day, m truyen len ngay
 * cho ni: getworking time: la no tra list 30p do ha????
 * hay khi nao vao la cung hien list 30 san roi:???
 *
 * */
const createAppointment = async (req, res) => {
    const errors = {};
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
        console.log(error);
        errors.error = 'Can not create new appointment. Please try again later';
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

/**
 * Of Patient
 * router: api/v1/appointments
 * */
const updateAppointment = async (req, res) => {
    const errors = {};
    const {appointmentId} = req.params;
    const data = {
        ...req.body,
    };
    let appointmentUpdated = null;
    try{
        appointmentUpdated = await Appointment.findByIdAndUpdate(appointmentId, data);
    }catch (error) {
        console.log(error);
        appointmentUpdated = null;
    }
    if (!appointmentUpdated){
        errors.error = 'Can\'t update appointment. Please try again later';
        return res.status(500).json({
            success: false,
            errors,
        });
    }

    //check exist appointment
    let appointment = null;
    try{
        appointment = Appointment.findById(appointmentId);
    }catch (error) {
        console.log(error);
        errors.error = 'Can\'t update appointment. Please try again later';
        return res.status(500).json({
            success: false,
            errors,
        });
    }
    if (!appointment){
        errors.error = 'Can\'t update appointment. Please try again later';
        return res.status(400).json({
            success: false,
            errors,
        })
    }
    return res.status(200).json({
        success: true,
        data: {
            appointmentUpdated,
        },
    });
};

/**
 * Of Patient
 * router: api/v1/appointments/
 * get all appointment
 * */

const getAllAppointment = async (req, res) => {
    const page = +req.query.page || 1;
    const page_size = 12;
    const skip = page_size * (page - 1);
    const limit = page_size;
    const owner = req.user;
    let appointments = [];
    try{
        appointments = await Appointment.find({
            owner,
        })
            .populate('owner')
            .skip(skip)
            .limit(limit);
    }catch (error) {
        console.log(error);
        appointments = [];
    }
    let total_appointments = [];
    try{
        total_appointments = Appointment.countDocuments();
    }catch (error) {
        console.log(error);
        total_appointments = [];
    }
    const total_page = Math.ceil(total_appointments /page_size);
    return res.status(200).json({
        success: true,
        data: {
            appointments,
        },
        meta: {
            page,
            page_size: appointments.length,
            total_page,
            total_size: total_appointments,
        }
    })
};

/**
 * Of Patient
 * router: api/v1/appointments/{id}/cancel
 * */
const cancelRequestAppointment = async (req, res) => {

};

/**
 * Of Doctor
 * router: api/v1/appointments/
 * */
const getAllAppointmentOfDoctor = async (req, res) => {

};
/**
 * Of Doctor
 * router: ofdoctor/{id}/status
 * */
const updateStatusWhenBookAppointment = async (req, res) => {

};
/**
 * Of Doctor
 * router: api/v1/appointments/{id}
 * */

const getDoctorAppointment = async (req, res) => {
    const errors = {};
    const {AppointmentId} = req.params;
    let appointment = null;
    try{
        appointment = await Appointment.findById(AppointmentId)
            .populate('owner');
    }catch (error) {
        console.log(error);
        errors.error = 'Can\'t get appointment. Please try again later';
        return res.status(500).json({
            success: false,
            errors,
        });
    }
    if (!appointment){
        errors.error = 'Can\'t get appointment. Please try again later';
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    return res.status(200).json({
        success: true,
        data: {
            appointment,
        }
    })
};


/**
 * how to calculate time free of doctor
 * doctor
 * **/
const calculateTimeFreeDoctor = async (req, res) =>{

};

module.exports = {
    createAppointment,
    getDoctorAppointment,
    getAllAppointment,
};
