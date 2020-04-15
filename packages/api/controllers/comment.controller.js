const mongoose = require('mongoose');
const _ = require('lodash');
const Doctor = require('../models/Doctor');
const Comment = require('../models/Comment');

/**
 * get all comments
 * */
const getComments = async (req, res) => {
    const { doctor_id } = req.query;
    const filter = {};
    if (doctor_id) {
        filter.doctor = doctor_id;
    }
    try {
        const comments = await Comment.find(filter)
            .populate('commenter')
            .populate('doctor')

        return res.json({
            success: true,
            data: comments,
            statusCode: 200,
        });
    } catch (error) {
        return res.json({
            success: true,
            data: [],
            statusCode: 200,
        });
    }
};

const createCommentToDoctor = async (req, res) => {
    const errors = {};
    const {
        doctor_id
    } = req.params;
    let doctor = null;
    try {
        doctor = await Doctor.findById(doctorId);
    } catch (error) {
        console.log(error);
        doctor = null;
    }
    if (!doctor) {
        errors.error = 'Doctor not found!';
        return res.status(404).json({
            success: false,
            errors,
        });
    }
    const commenter = req.user.id;
    const data = {
        ...req.body,
        doctor: doctor_id,
        commenter,
    };
    const newComment = new Comment(data);
    let commentCreated = null;
    try {
        commentCreated = await newComment.save()
    } catch (error) {
        console.log(error);
        commentCreated = null;
    }

    if (!newComment) {
        errors.error = 'Can\'t create comment. Please try again later!';
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    let {
        rate,
        num_comment
    } = doctor;
    rate = ((rate * num_comment) + commentCreated.rate_star) / (num_comment + 1);
    num_comment += 1;
    try {
        await Doctor.findByIdAndUpdate(doctorId, {
            rate,
            num_comment
        });
    } catch (error) {
        console.log(error);
        try {
            await Doctor.findByIdAndUpdate(commentCreated._id);
        } catch (error1) {
            console.log(error1);
        }
        errors.error = 'Can\'t create comment. Please try again later!';
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    let comment = null;
    try {
        comment = await Comment.findById(commentCreated._id).populate('commenter');
    } catch (error) {
        console.log(error);
        comment = null;
    }

    if (!comment) {
        errors.error = 'Can\'t create comment. Please try again later!';
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    return res.status(200).json({
        success: true,
        data: {
            commentCreated: comment,
        },
    });
};
module.exports = {
    getComments,
    createCommentToDoctor,
};