const Doctor = require('../models/Doctor');
const Favorite = require('../models/Favorite');
const Specialist = require('../models/Specialist');

const updateDoctor = async (req, res) => {
    //Todo update doctor examination + specialist
    const errors = {};
    const {doctor_id} = req.params;
    console.log(doctor_id);
    let {body: data} = req;
    if (data.first_name || data.last_name) {
        const full_name = `${data.first_name} ${data.last_name}`;
        data.full_name = full_name;
    }
    try {
        const doctorUpdated = await Doctor.findByIdAndUpdate(doctor_id, data, {new: true});
        console.log(doctorUpdated);
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
            full_name: new RegExp(keyword, 'i'),
            location: {
                "$geoNear": {
                    "$maxDistance": 10000,
                    "$geometry": {
                        type: "Point",
                        coordinates: [+longitude, +latitude]
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
        console.log(error);
        return res.json({
            success: true,
            data: [],
            statusCode: 200
        });
    }
};

const getDoctor = async (req, res) => {
    const {doctor_id} = req.query;
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
};

const addFavorite = async (req, res) => {
    const {
        user
    } = req;
    const errors = {};
    const {doctor_id} = req.params;
    console.log(doctor_id);
    let doctor = null;
    try {
        doctor = await Doctor.findById(doctor_id);
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
            doctor: doctor_id,
        })
    } catch (error) {
        console.log(error);
        favorite = null;
    }

    if (!favorite) {
        const data = {
            is_favorite: true,
            favorite_personal: user.id,
            doctor: doctor_id,
        };
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
    }

    //clear add to favorite
    let doctorFavoriteDeleted = null;
    try {
        doctorFavoriteDeleted = await Favorite.findOneAndDelete({
            doctor: doctor_id,
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
    console.log(total_page);
    console.log(doctors.length);
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
    const {doctor_id} = req.params;
    let doctor = null;
    try {
        doctor = await Doctor.findById(doctor_id);
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
const getDoctorNearBy = async (req, res) => {
    const {latitude: lat, longitude: lng} = req.query;
    const distance = 10000;
    try {
        const doctorList = await Doctor.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lat, lng],
                    },
                    $maxDistance: distance,
                },
            },
        }).populate('specialist').lean();
        return res.status(200).json({
            success: true,
            data: doctorList
        })
    } catch (error) {
        return res.status(200).json({
            success: true,
            data: []
        })
    }
};


module.exports = {
    updateDoctor,
    searchDoctor,
    getDoctor,
    getAllDoctor,
    getDetailDoctor,
    addFavorite,
    getDoctorNearBy
};