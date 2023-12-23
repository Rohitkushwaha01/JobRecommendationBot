const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: Number,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    educationLevel: {
        type: String,
        required: true
    },
    fieldOfStudy: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    technicalSkill: {
        type: [String],
        required: true
    },
    interests: {
        type: [String],
        required: true
    },
    jobRole:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    }
})

module.exports = UserDetails = mongoose.model('userdetails', UserDetailsSchema);