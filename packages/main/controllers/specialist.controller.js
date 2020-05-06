const Specialist = require('../models/Specialist');
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
        newSpecialist.doctor_id = user._id;
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
    //Todo update
    const {specialist_id} = req.params;
    let listDoctor = [];
};

const getAllSpecialist = async (req, res) =>{
    //Todo update
};

module.exports = {
    createSpecialist,
    updateSpecialist,
    deleteSpecialist,
    getAllDoctorOfSpecialist
};