const validator = require('validator');
const isEmpty = require('./is_empty');
const resetPassword = (data) => {
    const errors = {};
    const value = {
        ...data
    };
    value.phone_number = !isEmpty(value.phone_number) ? value.phone_number : '';
    if (validator.isEmpty(value.phone_number)){
        errors.phone_number = 'Phone Number is required'
    }
    return{
        isValid : isEmpty(errors),
        errors
    }
};
module.exports ={
  resetPassword,
};
