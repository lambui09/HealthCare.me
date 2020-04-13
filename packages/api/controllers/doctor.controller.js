const Doctor = require('../models/Doctor');
const Favorite = require('../models/Favorite');

const createDoctor = async (req, res) => {

};

const getAllDoctor = async (req, res) => {
    const page = +req.query.page || 1;
    const page_size = 12;
    const skip = page_size * (page - 1);
    const limit = page_size;
    let doctors = [];
    try {
        doctors = await Doctor.find().skip(skip).limit(limit)
    } catch (error) {
        console.log(error);
        doctors = []
    }
    let total_users = [];
    try {
        total_users = await Doctor.countDocuments()
    } catch (error) {
        console.log(error);
        total_users = []
    }
    const total_page = Math.ceil(total_users / page_size);
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
    try {
        doctor = await Doctor.findById(doctorId);
    } catch (error) {
        console.log(error);
        doctor = null;
    }
    if (!doctor) {
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
        data: {
            doctor,
        },
    });
};

const addFavorite = async (req, res) => {
    const {
        user
    } = req;
    const errors = {};
    const {doctorId} = req.params;
    console.log(doctorId)
    let doctor = null;
    try {
        doctor = await Doctor.findById(doctorId);
    } catch (error) {
        console.log(error);
        doctor = null;
    }
    if (!doctor) {
        errors.error = 'Doctor not found!';
        return res.status(500).json({
            success: false,
            errors,
        });
    }

    let favorite = null;
    try {
        favorite = await Favorite.findOne({
            doctor: doctorId,
        })
    } catch (error) {
        console.log(error);
        favorite = null;
    }

    if (!favorite) {
        const data = {
            favorite_person: user,
            doctor: doctorId,
        };
    }

    console.log(data)
    const newDoctorFavorite = new Favorite(data);
    let doctorFavoriteCreated = null;
    try {
        doctorFavoriteCreated = await newDoctorFavorite.save(data)
    } catch (error) {
        console.log(error);
        doctorFavoriteCreated = null;
    }
    if (!doctorFavoriteCreated) {
        errors.error = 'Can\'t not create favorite for doctor!';
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    return res.status(200).json({
        success: true,
        data: {
            doctorFavoriteCreated,
        },
    });
    //clear add to favorite
    let doctorFavoriteDeleted = null;
    try {
        doctorFavoriteDeleted = await Favorite.findOneAndDelete({
            doctor: doctorId,
        })
    } catch (error) {
        console.log(error);
        doctorFavoriteDeleted = null;
    }

    if (!doctorFavoriteDeleted) {
        errors.error = 'Can\'t not remove favorite for doctor!';
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    return res.status(200).json({
        success: true,
        data: {
            doctorFavoriteDeleted,
        },
    });
}
module.exports = {
    getAllDoctor,
    getDetailDoctor,
    addFavorite,
};