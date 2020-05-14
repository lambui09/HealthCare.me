const Specialist = require('../models/Specialist');
const Doctor = require('../models/Doctor');
const createSpecialist = async (req, res) => {
    const errors = {};
    const {
        name,
        description,
    } = req.body;
    const {
        user
    } = req;
    try {
        const newSpecialist = new Specialist();
        newSpecialist.name = name;
        newSpecialist.description = description;
        newSpecialist.creator = user._id;
        const newSpecialistCreated = await newSpecialist.save();
        return res.status(200).json({
            success: true,
            data: newSpecialistCreated,
        })
    } catch (error) {
        console.log(error);
        errors.error = 'Server error';
        return res.status(500).json({
            success: false,
            errors,
        })
    }
};

const updateSpecialist = async (req, res) => {
    const errors = {};
    const {
        specialist_id
    } = req.params;
    const data = req.body;

    try {
        const specialistUpdated = await Specialist.findByIdAndUpdate(specialist_id, data, {new: true})
            .populate('doctor');
        console.log(specialistUpdated);
        return res.status(200).json({
            success: true,
            data: specialistUpdated
        });
    } catch (error) {
        console.log(error);
        errors.error = 'Server error';
        return res.status(500).json({
            success: false,
            errors,
        })
    }
};
const deleteSpecialist = async (req, res) => {
    const errors = {};
    const {specialist_id} = req.params;
    let specialistDeleted = null;
    try {
        specialistDeleted = await Specialist.findByIdAndDelete(specialist_id);
    } catch (error) {
        console.log(error);
        errors.error = 'Can\'t delete specialist. Please try again later';
        return res.status(500).json({
            success: false,
            errors,
        })
    }
    if (!specialistDeleted) {
        errors.error = 'Can\'t delete specialist. Please try again later';
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
            specialistDeleted,
        },
    });
};

const getAllDoctorOfSpecialist = async (req, res) => {
    const {specialist_id} = req.params;
    console.log(specialist_id);
    try {
        const doctorList = await Doctor.find({specialist: specialist_id}).populate('specialist').lean();
        console.log(doctorList);
        return res.status(200).json({
            success: true,
            data: {
                data: doctorList,
                total_size: doctorList.length
            },
        })
    } catch (error) {
        return res.status(200).json({
            success: true,
            data: {}
        });
    }
};

const getAllSpecialist = async (req, res) => {
    try {
        const listSpecialist = await Specialist.find().lean();
        return res.status(200).json({
            success: true,
            data: {
                data: listSpecialist,
                total_size: listSpecialist.length
            }
        })
    } catch (error) {
        return res.status(200).json({
            success: true,
            data: {},
        })
    }
};

module.exports = {
    createSpecialist,
    updateSpecialist,
    deleteSpecialist,
    getAllDoctorOfSpecialist,
    getAllSpecialist
};