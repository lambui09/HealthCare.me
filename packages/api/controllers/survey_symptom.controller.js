const surveySymptom = require('../models/SurveySymptom');
const createSymptom = async (req, res) => {
    const errors = {};
    const {
        symptom_name
    } = req.body;
    try{
        const newSurveySymptom = new surveySymptom();
        newSurveySymptom.symptom_name = symptom_name;
        const surveySurveyCreated = await newSurveySymptom.save();
        return res.status(200).json({
            success: true,
            data: surveySurveyCreated,
        });

    }catch (error) {
        console.log(error);
        errors.error = 'Server error';
        return res.status(500).json({
            success: false,
        })
    }
};
module.exports = {
    createSymptom,
};