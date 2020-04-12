const patient = require('../models/Patient');
const isAuth = async (req, res, next) =>{
const authHeader = req.headers.authorization || '';
const token = authHeader ? authHeader.split(' ')[1] : '';
const errors = {}

};