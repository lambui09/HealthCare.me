const Patient = require('../models/Patient');
const updatePatient = async (req, res) => {
    const errors = {};
    const {patient_id} = req.params;
    let {body: data} = req;
    if (data.first_name || data.last_name) {
        const full_name = `${data.first_name} ${data.last_name}`;
        data.full_name = full_name;
    }
    console.log(data);
    console.log({patient_id});
    console.log(req.params);
    try {
        const patientUpdated = await Patient.findByIdAndUpdate(patient_id, data, {new: true});
        console.log(patientUpdated);
        return res.status(200).json({
            success: true,
            data: patientUpdated
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
const getDetailPatient = async (req, res) => {
    const errors = {};
    const {
        patient_id
    } = req.params;
    let patient = null;
    try {
        patient = await Patient.findById(patient_id).lean();
    } catch (error) {
        console.log(error);
        patient = null;
    }
    if (!patient) {
        errors.error = 'Can\'t get detail doctor, Please try again later';
        return res.status(404).json({
            success: false,
            errors,
        },);
    }
    return res.status(200).json({
        success: true,
        data: {
            patient,
        },
    });
};

module.exports = {
    updatePatient,
    getDetailPatient
};