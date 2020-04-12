const Doctor = require('../models/Doctor');

const createDoctor = async (req, res) => {

};

const getAllDoctor = async (req, res) => {
    const page = +req.query.page || 1;
    const page_size = 12;
    const skip = page_size * (page -1);
    const limit = page_size;
    let doctors = [];
    try{
        doctors = await Doctor.find().skip(skip).limit(limit)
    }catch (error) {
        console.log(error);
        doctors = []
    }
    let total_users = [];
    try {
        total_users = await Doctor.countDocuments()
    }catch (error) {
        console.log(error);
        total_users = []
    }
    const total_page = Math.ceil(total_users /page_size);
    return res.status(200).json({
        success: true,
        data: {
            doctors,
        },
        meta: {
            page,
            page_size: doctors.length,
            total_page,
            total_size: total_users,
        }
    })
};
const getDetailDoctor = async (req, res) => {
    const errors = {};
    const {doctorId} = req.params;
    let doctor = null;
    try{
        doctor = await Doctor.findById(doctorId);
    }catch (error) {
        console.log(error);
        doctor = null;
    }
    if (!doctor){
        errors.error = 'Can\'t get detail doctor, Please try again later';
        return res.status(404).json(
            {
                success: false,
                errors,
            },
        );
    }
    return res.status(200).json({
        success: true,
        data:{
            doctor,
        },
    });
};
module.exports = {
  getAllDoctor,
  getDetailDoctor,
};