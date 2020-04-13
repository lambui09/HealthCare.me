const Doctor = require('../models/Doctor');

const updateDoctor = async (req, res) => {
    const { doctor_id } = req.params;
    const { body: data } = req;

    try {
        const doctorUpdated = await Doctor.findByIdAndUpdate(doctor_id, data);
        return res.json({
            success: true,
            data: doctorUpdated,
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

const searchDoctor = async (req, res) => {
    const {
        keyword,
        latitude,
        longitude
    } = req.query;

    try {
        const list_doctor = await Doctor.find({
            full_name: new RegExp(keyword),
            location: {
                "$near": {
                    "$maxDistance": 10000,
                    "$geometry": {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    }
                }
            }
        });
        return res.json({
            success: true,
            data: list_doctor,
            statusCode: 200
        });
    } catch (error) {
        return res.json({
            success: true,
            data: [],
            statusCode: 200
        });
    }
}

const getDoctor = async (req, res) => {
    const { doctor_id } = req.query;
    const filter = {};
    if (doctor_id) {
        filter._id = doctor_id;
    }
    try {
        const list_doctor = await Doctor.find(filter);
        return res.json({
            success: true,
            data: list_doctor,
            statusCode: 200
        });
    } catch (error) {
        return res.json({
            success: true,
            data: [],
            statusCode: 200
        });
    }
}

module.exports = {
    updateDoctor,
    searchDoctor,
    getDoctor,
};