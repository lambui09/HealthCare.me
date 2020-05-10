const moment = require('moment');
const Appointment = require('../models/Appointment');
const sendNotification = require('../helpers/sendNotification');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
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
        try{
            const doctor = await Doctor.findById(doctor_id).lean();
            const patient = await Patient.findById(user._id).lean();
            const title = `Bạn có lịch hẹn mới từ bệnh nhân ${patient.full_name}`;
            const body = `Vào lúc ${newAppointment.time} ngày ${newAppointment.date}`;
            let device_token = doctor.device_token;
            if (device_token){
                await sendNotification(device_token, {
                    title,
                    body,
                    sender: patient._id.toString(),
                    receiver: doctor._id.toString(),
                }, true);
            }
        }catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
        //add send notification:

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
    const {
        user
    } = req;

    try {
        const appointmentUpdated = await Appointment.findByIdAndUpdate(appointment_id, data).populate('doctor_id')
            .populate('patient_id').lean();
        //add send notification
        const title = `Lịch khám của bạn với bác sĩ ${appointmentUpdated.doctor_id.full_name} đã được xác nhận.`;
        const body = `Vào lúc ${appointmentUpdated.updatedAt}`;
        let device_token = appointmentUpdated.patient_id.device_token;
        if (device_token){
            sendNotification(device_token, {
                title,
                body,
                sender: appointmentUpdated.doctor_id._id.toString(),
                receiver: appointmentUpdated.patient_id._id.toString(),
            }, false)
        }
        return res.status(200).json({
            success: true,
            data: appointmentUpdated,
            statusCode: 200,
        });
    } catch (error) {
        return res.status(200).json({
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
        status,
        status_not,
    } = req.query;

    let filter = {};
    if (doctor_id) {
        filter.doctor_id = doctor_id;
    }
    if (patient_id) {
        filter.patient_id = patient_id;
    }
    if (appointment_id) {
        filter.appointment_id = appointment_id;
    }

    if (status) {
        filter.status = status;
    }

    if (status_not) {
        const newFilter = {
            ...filter,
            '$not': {
                status_not,
            }
        };
        filter = {...newFilter};
    }

    let appointments;
    try {
        appointments = await Appointment
            .find(filter)
            .populate('doctor_id')
            .populate('patient_id');
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