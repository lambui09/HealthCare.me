const Patient = require('../models/Patient');
const updatePatient = async (req, res) =>{
    const errors = {};
    const {patient_id} = req.params;
    let {body: data} = req;
    if (data.first_name || data.last_name) {
        const full_name = `${data.first_name} ${data.last_name}`;
        data.full_name = full_name;
    }
    try{
        const patientUpdated = await Patient.findByIdAndUpdate(patient_id, data);
        return res.status(200).json({
            success: true,
            data: patientUpdated
        });
    }catch (error) {
        errors.error = 'Server error';
        return res.status(500).json({
            success: false,
            errors,
        })
    }
};

module.exports = {
    updatePatient
};