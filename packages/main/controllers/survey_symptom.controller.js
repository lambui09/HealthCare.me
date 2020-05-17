const Symptom = require('../models/Symptom');
const createSymptom = async (req, res) => {
    const errors = {};
    const {
        name
    } = req.body;
    try {
        const newSurveySymptom = new Symptom();
        newSurveySymptom.name = name;
        const surveySurveyCreated = await newSurveySymptom.save();
        return res.status(200).json({
            success: true,
            data: surveySurveyCreated,
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

const updateSymptom = async (req, res) => {
    const errors = {};
    const {
        symptom_id
    } = req.params;
    const data = req.body;

    try {
        const symptomUpdated = await Symptom.findByIdAndUpdate(symptom_id, data)
            .populate('doctor');
        console.log(symptomUpdated);
        return res.status(200).json({
            success: true,
            data: symptomUpdated
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

const deleteSymptom = async (req, res) => {
    const errors = {};
    const {symptom_id} = req.params;
    let symptomDeleted = null;
    try {
        symptomDeleted = await Symptom.findByIdAndDelete(symptom_id);
    } catch (error) {
        console.log(error);
        errors.error = 'Can\'t delete specialist. Please try again later';
        return res.status(500).json({
            success: false,
            errors,
        })
    }
    if (!symptomDeleted) {
        errors.error = 'Can\'t delete tour. Please try again later';
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
            symptomDeleted,
        },
    });
};

const getAllSymptom = async (req, res) => {
    try {
        const listSymptom = await Symptom.find().lean();
        return res.status(200).json({
            success: true,
            data: {
                data: listSymptom,
                total_size: listSymptom.length
            },
        })
    } catch (error) {
        return res.status(200).json({
            success: true,
            data: {},
        })
    }
};

module.exports = {
    createSymptom,
    updateSymptom,
    deleteSymptom,
    getAllSymptom,
};