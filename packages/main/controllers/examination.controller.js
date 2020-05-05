const Examination = require('../models/Examination');
const Doctor = require('../models/Doctor');
const createExamination = async (req, res) => {
    const errors = {};
    const {
        service_name,
    } = req.body;
    const {
        user
    } = req;
    try {
        const newExamination = new Examination();
        newExamination.service_name = service_name;
        newExamination.doctor_id = user._id;
        const newExaminationCreated = await newExamination.save();
        return res.status(200).json({
            success: true,
            data: newExaminationCreated,
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
const updateExamination = async (req, res) => {
    const errors = {};
    const {
        examination_id
    } = req.params;
    const data = req.body;
    try {
        const examinationUpdated = await Examination.findByIdAndUpdate(examination_id, data, {new: true})
            .populate('doctor');
        console.log(examinationUpdated);
        return res.status(200).json({
            success: true,
            data: examinationUpdated
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
const deleteExamination = async (req, res) => {
    const errors = {};
    const {examination_id} = req.params;
    let examinationDeleted = null;
    try {
        examinationDeleted = await Examination.findByIdAndDelete(examination_id);
    } catch (error) {
        console.log(error);
        errors.error = 'Can\'t delete examination. Please try again later';
        return res.status(500).json({
            success: false,
            errors,
        })
    }
    if (!examinationDeleted) {
        errors.error = 'Can\'t delete examination. Please try again later';
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
            examinationDeleted,
        },
    });
};

const getAllExaminationOfDoctor = async (req, res) => {
    const errors = {};
    const {doctor_id} = req.params;
    const {
        user
    } = req;
    const filter = {};
    if (user._id) {
        filter._id = doctor_id;
    }
    console.log(doctor_id);
    console.log(filter._id);
    try {
        const list_examination = await Examination.find(filter).populate('examination_list');
        console.log(list_examination);
        return res.json({
            success: true,
            data: list_examination,
            statusCode: 200
        });
    } catch (error) {
        return res.json({
            success: true,
            data: [],
            statusCode: 200
        });
    }
};

module.exports = {
    createExamination,
    updateExamination,
    deleteExamination,
    getAllExaminationOfDoctor,
};