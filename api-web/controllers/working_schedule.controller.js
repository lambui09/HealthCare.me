const lodash = require('lodash');
const Working_schedule_doctor = require('../models/WorkingSchedule');

/**
 * create time duration for doctor
 * */
const createDateWorkingDoctor = async (req, res) => {
    const errors = {};
    const workingSchedule = new Working_schedule_doctor({
        owner: req.user.id
    });
    workingSchedule.from_date = req.from_date;
    workingSchedule.start_time = req.start_time;
    workingSchedule.end_Time = req.end_Time;
    workingSchedule.duration_default_appointment = req.duration_default_appointment;
    console.log(workingSchedule);
    let workingScheduleCreated = null;
    try {
        workingScheduleCreated = await workingSchedule.save()
    } catch (error) {
        console.log(workingSchedule);
        errors.error = 'Can not create new working time doctor. Please try again later';
        return res.status(500).json(
            {
                success: false,
                errors,
            }
        )
    }
    if (!workingScheduleCreated) {
        errors.error = 'Can not create new working time doctor, Please try again later';
        return res.status(400).json({
            success: false,
            errors,
        })
    }
    console.log(workingScheduleCreated);
    return res.status(200).json({
        success: true,
        data: {
            workingScheduleCreated,
        }
    })
};

/**
 * create data time in a week for doctor
 * */

const changeTimeDuration = async (req, res) => {
    const errors = {};
    const {working_schedule_doctor_Id} = req.params;
    const data = {
        ...req.body,
    };
    let workingTimeUpdated = null;
    try {
        workingTimeUpdated = await Working_schedule_doctor.findByIdAndUpdate(working_schedule_doctor_Id, data)
    } catch (error) {
        console.log(error);
        workingTimeUpdated = null
    }

    if (!workingTimeUpdated) {
        errors.error = 'Can\'t update working time doctor. Please try again later';
        return res.status(400).json(
            {
                success: false,
                errors,
            },
        );
    }
    let workingScheduleDoctor = null;
    try {
        workingScheduleDoctor = await Working_schedule_doctor.findById(working_schedule_doctor_Id);
    } catch (error) {
        console.log(error);
        workingScheduleDoctor = null;
    }
    if (!workingScheduleDoctor) {
        errors.error = 'Can\'t update tour. Please try again later';
        return res.status(400).json(
            {
                success: false,
                errors,
            },
        );
    }
    return res.status(200).json({
        success: true,
        data: {
            workingScheduleDoctorUpdate: workingScheduleDoctor,
        },
    });
};

/**
 *
 *
 * */
const getWorkingSchedule = async (req, res) => {
    const data_work = req.params



};
module.exports = {
    createDateWorkingDoctor,
    changeTimeDuration,
    getWorkingSchedule
};
