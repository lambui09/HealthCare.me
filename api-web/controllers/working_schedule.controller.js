const lodash = require('lodash');
const Working_schedule_doctor = require('../models/WorkingSchedule');
const Appointment = require('../models/Appointment');

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
    workingSchedule.end_time = req.end_time;
    workingSchedule.duration_default_appointment = req.duration_default_appointment;
    let startTime = workingSchedule.start_time;
    let end_Time = workingSchedule.end_time;
    let duration_appointment = workingSchedule.duration_default_appointment;
    var list_time_working_a_date = [];
    if (end_Time > startTime) {
        list_time_working_a_date = range(end_Time, startTime, duration_appointment);
    }
    if (list_time_working_a_date.length > 0) {
        workingSchedule.list_time = list_time_working_a_date;
    }
    console.log(workingSchedule);
    let workingScheduleCreated = null;
    try {
        workingScheduleCreated = await workingSchedule.save()
    } catch (error) {
        console.log(workingSchedule);
        errors.error = 'Can not create new working time doctor. Please try again later';
        return res.status(500).json({
            success: false,
            errors,
        })
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
    const {
        working_doctor_id
    } = req.params;
    const {
        date
    } = req.query;
    const errors = {};
    let working_schedule;
    try {
        working_schedule = Working_schedule_doctor.findOne({
            doctor_id: working_doctor_id,
            from_date: {
                '$lte': date,
            },
            end_date: {
                '$gte': date,
            }
        });
    } catch (error) {
        console.log(error);
        errors.error = 'Can\'t ..............'
        return res.status(500).json({
            success: false,
            errors,
        });
    }

    const list_time = working_schedule.list_time;
    try {
        const list_appointment = Appointment.find({
            doctor_id: working_doctor_id,
            appointment_date: date,
            status: {
                '$ne': 'CANCELED'
            }
        });

        const list_time_booked = list_appointment.map(app => app.appointment_time);

        const list_time_available = list_time.map(time => {
            return {
                time,
                status: !!list_time_booked.find(time)
            }
        });

        return res.status(200).json({
            success: true,
            data: {
                listTime: list_time_available,
            },
        });

    } catch (error) {
        console.log(error);
        errors.error = 'Can\'t ..............';
        return res.status(500).json({
            success: false,
            errors,
        });
    }
};

function range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len).fill().map((_, idx) => start + (idx * step))
}

module.exports = {
    createDateWorkingDoctor,
    changeTimeDuration,
    getWorkingSchedule
};
