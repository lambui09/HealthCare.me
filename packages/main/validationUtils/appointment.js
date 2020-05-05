const validator = require('validator');
const isEmpty = require('../validationUtils/is_empty');
const createAppointment = (data) =>{
  const errors = {};
  const value = {
  ...data,
  };
  value.duration_appointment = !isEmpty(value.duration_appointment) ? value.duration_appointment : '';
  value.price = !isEmpty(value.price) ? value.price : '';
  value.appointment_date = !isEmpty(value.appointment_date) ? value.appointment_date : '';
  value.status = !isEmpty(value.status) ? value.status : '';

  if(validator.isEmpty(value.duration_appointment){
    errors.duration_appointment = 'Duration appointment date is required'
  }
  if(validator.isEmpty(value.price)){
    errors.price = 'Price field is required';
  }
  if(validator.isEmpty(value.appointment_date){
    errors.appointment_date = 'Appointment date is required'
  }
  if(validator.isEmpty(value.status){
    errors.status = 'Status is required'
  }
}
module.exports ={
createAppointment,
}