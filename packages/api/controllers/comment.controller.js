const mongoose = require('mongoose');
const _ = require('lodash');
const Doctor = require('../models/Doctor');
const Comment = require('../models/Comment');

/**
 * get all comments
 * */
const getAllComments = async (req, res) => {
    const page = +req.query.page || 1;
    const page_size = 10;
    const skip = page_size * (page - 1);
    const limit = page_size;
    let comments = [];
    try {
        comments = await Comment.find()
            .populate('commenter')
            .populate('doctor')
            .skip(skip)
            .limit(limit)
    } catch (error) {
        console.log(error);
        comments = [];
    }
    let total_comments = [];
    try {
        total_comments = Comment.countDocuments();
    } catch (error) {
        console.log(error);
        total_comments = [];
    }
    const total_page = Math.ceil(total_comments / page_size);
    return res.status(200).json({
        success: true,
        data: {
            comments,
        },
        meta: {
            page,
            page_size: comments.length,
            total_page,
            total_size: total_comments,
        }
    })
};

const getAllCommentsOwnDoctor = async (req, res) => {
    const page = +req.query.page || 1;
    const page_size = 6;
    const skip = page_size * (page - 1);
    const limit = page_size;
    const errors = {};
    const {doctorId} = req.params;
    let comments = [];
    try {
        comments = await Comment.find({doctor: mongoose.mongo.ObjectId(doctorId)}).populate('commenter')
            .sort({createdAt: -1}).skip(skip)
            .limit(limit);
    } catch (error) {
        console.log(error);
        comments = []
    }
    console.log(comments);
    let total_comments = [];
    try {
        total_comments = await Comment.findById(doctorId);
    } catch (error) {
        console.log(error);
        total_comments = [];
    }
    console.log(total_comments);
    const total_page = Math.ceil(total_comments.length / page_size);
    return res.status(200).json({
        success: true,
        data: {
            comments,
        },
        meta: {
            page,
            page_size: comments.length,
            total_page,
            total_size: total_comments,
        },
    });
};

const createCommentToDoctor = async (req, res) => {
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
        errors.error = 'Doctor not found!';
        return res.status(404).json({
            success: false,
            errors,
        });
    }
    const commenter = req.user.id;
    const data = {
        ...req.body,
        doctor: doctorId,
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

    if (!newComment){
        errors.error = 'Can\'t create comment. Please try again later!';
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    let {rate, num_comment} = doctor;
    rate = ((rate * num_comment) + commentCreated.rate_star) / (num_comment + 1);
    num_comment += 1;
    try{
        await Doctor.findByIdAndUpdate(doctorId, {rate, num_comment});
    }catch (error) {
        console.log(error);
        try {
            await Doctor.findByIdAndUpdate(commentCreated._id);
        }catch (error1) {
            console.log(error1);
        }
        errors.error = 'Can\'t create comment. Please try again later!';
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    let comment = null;
    try{
        comment = await Comment.findById(commentCreated._id).populate('commenter');
    }catch (error) {
        console.log(error);
        comment = null;
    }

    if (!comment){
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
    getAllComments,
    getAllCommentsOwnDoctor,
    createCommentToDoctor,
};

