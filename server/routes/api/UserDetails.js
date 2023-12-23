const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const UserDetails = require("../../models/UserDetails");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");


router.post(
    '/',
    [
        auth,
        [
            check("fname", "fname is required").not().isEmpty(),
            check("lname", "lname is required").not().isEmpty(),
            check("dateOfBirth", "dateOfBirth is required").not().isEmpty(),
            check("gender", "gender is required").not().isEmpty(),
            check("email", "email is required").not().isEmpty(),
            check("mobileNo", "mobileNo is required").not().isEmpty(),
            check("city", "city is required").not().isEmpty(),
            check("jobLocation", "jobLocation is required").not().isEmpty(),
            check("educationLevel", "educationLevel is required").not().isEmpty(),
            check("fieldOfStudy", "fieldOfStudy is required").not().isEmpty(),
            check("graduationYear", "graduationYear is required").not().isEmpty(),
            check("technicalSkill", "technicalSkill is required").not().isEmpty(),
            check("interests", "interest is required").not().isEmpty(),
            check("jobRole", "jobRole is required").not().isEmpty(),
            check("jobType", "jobType is required").not().isEmpty(),
            check("salary", "salary is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        // console.log(req.body)
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            fname,
            lname,
            dateOfBirth,
            gender,
            email,
            mobileNo,
            city,
            jobLocation,
            educationLevel,
            fieldOfStudy,
            graduationYear,
            technicalSkill,
            interests,
            jobRole,
            jobType,
            salary
        } = req.body;

        console.log(req.body)
        // Build userObject object
        const userFields = {};

        userFields.user = req.user.id;

        if (fname) userFields.fname = fname;
        if (lname) userFields.lname = lname;
        if (dateOfBirth) userFields.dateOfBirth = dateOfBirth;
        if (gender) userFields.gender = gender;
        if (email) userFields.email = email;
        if (mobileNo) userFields.mobileNo = mobileNo;
        if (city) userFields.city = city;
        if (jobLocation) userFields.jobLocation = jobLocation;
        if (educationLevel) userFields.educationLevel = educationLevel;
        if (fieldOfStudy) userFields.fieldOfStudy = fieldOfStudy;
        if (graduationYear) userFields.graduationYear = graduationYear;
        if (technicalSkill) userFields.technicalSkill = technicalSkill;
        if (interests) userFields.interests = interests;
        if (jobRole) userFields.jobRole = jobRole;
        if (jobType) userFields.jobType = jobType;
        if (salary) userFields.salary = salary;

        if (technicalSkill) {
            userFields.technicalSkill = technicalSkill.split(",").map((skill) => skill.trim());
        }

        if (interests) {
            userFields.interests = interests.split(",").map((interest) => interest.trim());
        }

        try {
            let userDetails = await UserDetails.findOne({ user: req.user.id });

            if (userDetails) {
                // update
                userDetails = await UserDetails.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: userFields },
                    { new: true }
                );

                return res.json(userDetails);
            }

            // create
            userDetails = new UserDetails(userFields);
            await userDetails.save();
            return res.json(userDetails, { errors: [{ message: "User Data saved" }] });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }

    });


// @route    GET api/profile/user/:user_id
// @desc     Get profile by user id
// @access   public

router.get('/', auth, async(req, res)=>{
    try {
        const userdetails = await UserDetails.findOne({user: req.user.id}).populate('user', ['name', 'email']);
        if(!userdetails){
           return res.status(400).json({ errors: [{ message: "There is no userdetails for this user"}] })
        }
        res.json(userdetails);
    } catch (error) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ errors: [{ message: "There is no userdetails for this user"}] })
        }
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;