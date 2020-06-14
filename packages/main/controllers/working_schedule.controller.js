const moment = require('moment');
const WorkingSchedule = require('../models/WorkingSchedule');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');

const createWorkingSchedule = async (req, res) => {
    const {
        user
    } = req;
    const {
        from_date,
        end_date,
        start_time,
        end_time,
        duration_default_appointment
    } = req.body;
    const newWorkingSchedule = new WorkingSchedule();
    if (duration_default_appointment) {
        newWorkingSchedule.duration_default_appointment = duration_default_appointment;
    }
    newWorkingSchedule.doctor_id = mongoose.Types.ObjectId(user._id);
    newWorkingSchedule.from_date = moment(from_date);
    newWorkingSchedule.end_date = moment(end_date);
    newWorkingSchedule.start_time = start_time;
    newWorkingSchedule.end_time = end_time;
    newWorkingSchedule.list_time = rangeTime(start_time, end_time, duration_default_appointment);
    console.log(newWorkingSchedule.doctor_id);

    try {
        await newWorkingSchedule.save();
        return res.status(200).json({
            success: true,
            data: newWorkingSchedule,
            statusCode: 200,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            errorMessage: 'Server error',
            statusCode: 500,
        })
    }
};

const getAvailableTime = async (req, res) => {
    const {
        doctor_id
    } = req.params;
    const {
        date
    } = req.query;
    let working_schedule;
    try {
        working_schedule = await WorkingSchedule.findOne({
            doctor_id,
            from_date: {
                '$lte': moment(date),
            },
            end_date: {
                '$gte': moment(date),
            }
        });
        console.log(working_schedule);
        if (!working_schedule) {
            return res.status(200).json({
                success: true,
                data: {},
                statusCode: 200,
            });
        }
        const list_time = working_schedule.list_time;
        const list_time_booked = await Appointment.find({
            doctor_id,
            date: moment(date),
            status: {
                '$ne': 'CANCELED'
            }
        }).select({
            time: 1
        });

        const list_time_available = list_time.map(time => {
            return {
                time,
                status: !!list_time_booked.find(item => item.time === time)
            }
        });

        return res.status(200).json({
            success: true,
            data: {
                data: list_time_available,
                total_size: list_time_available.length,
            },
            statusCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            errorMessage: 'Server error',
            statusCode: 500,
        });
    }
};

function rangeTime(start, end, step = 15) {
    const startArr = start.split(':');
    const endArr = end.split(':');
    let startHour = +startArr[0];
    let startMinute = +startArr[1];
    let endHour = +endArr[0];
    let endMinute = +endArr[1];
    const data = [];
    while (!(startHour === endHour && startMinute === endMinute)) {
        startMinute += step;
        if (startMinute === 60) {
            startHour++;
            startMinute = 0;
        }
        const time = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
        data.push(time);
    }
    return data;
}

const getWorkingScheduleDoctor = async (req, res) => {
    const errors = {};
    const {
        doctor_id
    } = req.params;
    let workingSchedule = null;
    try {
        workingSchedule = await Doctor.findById(doctor_id).lean();
    } catch (error) {
        console.log(error);
        workingSchedule = null;
    }
    if (!workingSchedule) {
        errors.error = 'Can\'t get work schedule of doctor, Please try again later';
        return res.status(404).json({
            success: false,
            errors,
        },);
    }
    return res.status(200).json({
        success: true,
        data: workingSchedule,
    });
};
module.exports = {
    createWorkingSchedule,
    getAvailableTime,
    getWorkingScheduleDoctor
};