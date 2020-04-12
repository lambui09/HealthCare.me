const moment = require('moment');
const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
    const {
        duration,
        price,
        date,
        time,
        time_remainder_send_notification,
        doctor_id,
    } = req.body;

    const {
        user
    } = req;

    try {
        const newAppointment = new Appointment();
        if (duration) {
            newAppointment.duration = duration;
        }
        if (time_remainder_send_notification) {
            newAppointment.time_remainder_send_notification = time_remainder_send_notification;
        }
        newAppointment.price = price;
        newAppointment.date = moment(date);
        newAppointment.time = time;
        newAppointment.doctor_id = doctor_id;
        newAppointment.patient_id = user._id;
        const appointmentCreated = await newAppointment.save();
        return res.json({
            success: true,
            data: appointmentCreated,
            statusCode: 200,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            errorMessage: 'Server error',
            statusCode: 500,
        })
    }
};

const updateAppointment = async (req, res) => {
    const {
        appointment_id
    } = req.params;
    const data = req.body;
    if (data.date) {
        data.date = moment(data.date)
    }

    try {
        const appointmentUpdated = await Appointment.findByIdAndUpdate(appointment_id, data);
        return res.json({
            success: true,
            data: appointmentUpdated,
            statusCode: 200,
        });
    } catch (error) {
        return res.json({
            success: false,
            errorMessage: 'Server error',
            statusCode: 500,
        });
    }
};

const getListAppointment = async (req, res) => {
    const {
        doctor_id,
        patient_id,
        appointment_id,
    } = req.query;

    const filter = {};
    if (doctor_id) {
        filter.doctor_id = doctor_id;
    }
    if (patient_id) {
        filter.patient_id = patient_id;
    }
    if (appointment_id) {
        filter.appointment_id = appointment_id;
    }

    let appointments;
    try {
        appointments = await Appointment
            .find(filter)
            .populate('doctor')
            .populate('patient');
    } catch (error) {
        appointments = [];
    }

    return res.json({
        success: true,
        data: appointments,
        statusCode: 200,
    })
};

module.exports = {
    createAppointment,
    getListAppointment,
    updateAppointment,

};