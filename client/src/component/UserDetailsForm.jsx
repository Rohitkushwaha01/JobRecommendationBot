import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthenticationContext/auth.context';
import Spinner from './Spinner'
import { toast } from 'react-toastify'


export default function UserDetailsForm() {

    const { userDetails } = useContext(AuthContext);
    const [loading, setLoading] = useState(false); // New loading state


    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        mobileNo: "",
        city: "",
        jobLocation: "",
        educationLevel: "",
        fieldOfStudy: "",
        graduationYear: "",
        technicalSkill: "",
        interests: "",
        jobRole: "",
        jobType: "",
        salary: ""
    })

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
    } = formData

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let details = await userDetails(
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
        )

        if (details) {
            toast.success("User Data Saved!", {
                toastId: 'success1',
            })
        }
        setLoading(false);

    }



    return (
        <div className='user-details'>

            <form className='user-info-form' onSubmit={onSubmit}>

                <fieldset className="personal-info">
                    <legend>Personal Information</legend>
                    <div className='name'>
                        <div className='fname'>
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id='fname' placeholder='Enter your first name' name='fname' value={fname} onChange={onChange} />
                        </div>

                        <div className='lname'>
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" id='lname' placeholder='Enter your last name' name='lname' value={lname} onChange={onChange} />
                        </div>
                    </div>


                    <div className='date-of-birth'>
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id='dob' name='dateOfBirth' value={dateOfBirth} onChange={onChange} />
                    </div>

                    <div className='gender'>
                        <label htmlFor="gender">Gender</label>
                        <div className='gender-section'>
                            <div className='gender-type'>
                                <input type="radio" id='gender-male' value={"Male"} name='gender' onChange={onChange} />
                                <label htmlFor="gender-male">Male</label>
                            </div>
                            <div className='gender-type'>
                                <input type="radio" id='gender-female' value={"Female"} name='gender' onChange={onChange} />
                                <label htmlFor="gender-female">Female</label>
                            </div>
                            <div className='gender-type'>
                                <input type="radio" id='gender-not' value={"Prefer Not to say"} name='gender' onChange={onChange} />
                                <label htmlFor="gender-not">Prefer not to say</label>
                            </div>

                        </div>
                    </div>

                </fieldset>

                <fieldset className="contact-info">
                    <legend>Contact Information</legend>
                    <div className='contact'>
                        <div className='email'>
                            <label htmlFor="email">Email Add.</label>
                            <input type="email" id='email' placeholder='exam@gmail.com' value={email} name='email' onChange={onChange} />
                        </div>

                        <div className='number'>
                            <label htmlFor="number">Mobile No.</label>
                            <input type="number" id='number' placeholder='+91-XXXXXXXXXX' name='mobileNo' value={mobileNo} onChange={onChange} />
                        </div>
                    </div>

                </fieldset>

                <fieldset className='loc'>
                    <legend>Location</legend>
                    <div className="location">
                        <div className='current-city'>
                            <label htmlFor="current-city">Current City</label>
                            <input type="text" id='current-city' placeholder='Enter the current City' value={city} name='city' onChange={onChange} />
                        </div>

                        <div className='preferred-location'>
                            <label htmlFor="preferred-location">Preferred Job Location</label>
                            <input type="text" id='preferred-location' placeholder='Enter Preferred job Location' name='jobLocation' value={jobLocation} onChange={onChange} />
                        </div>
                    </div>

                </fieldset>

                <fieldset className='education'>
                    <legend>Educational Background</legend>
                    <div className="edu">
                        <div className='level'>
                            <label htmlFor="level">Highest Education</label>
                            <input type='text' id='level' placeholder='Enter highest Education level Eg. B.E, B.Tech, MBA, BCS, BCA' name='educationLevel' value={educationLevel} onChange={onChange} />
                        </div>

                        <div className='field-of-study'>
                            <label htmlFor="field-of-study">Field of Study</label>
                            <input type="text" id='field-of-study' placeholder='Enter Field of Study E.g. Computer Eng, E&TC Eng, AIDS Eng' name='fieldOfStudy' value={fieldOfStudy} onChange={onChange} />
                        </div>

                        <div className='year'>
                            <label htmlFor="year">Graduation Year</label>
                            <input type="text" id='year' placeholder='Enter Graduation Year E.g 2024, 2025' name='graduationYear' value={graduationYear} onChange={onChange} />
                        </div>
                    </div>

                </fieldset>

                <fieldset className='Skilled'>
                    <legend>Skills</legend>
                    <div className="skill-section">
                        <div className='skills'>
                            <label htmlFor="skills">Technical Skills</label>
                            <input type='text' id='skills' placeholder='Java, Python, Javascript, Node.js' name='technicalSkill' value={technicalSkill} onChange={onChange} />
                        </div>
                    </div>

                    <div className="skill-section">
                        <div className='hobbies'>
                            <label htmlFor="hobbies">Interest</label>
                            <input type='text' id='hobbies' placeholder='Enter your Hobbies' name='interests' value={interests} onChange={onChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset className='career-goals'>
                    <legend>Career Goals</legend>
                    <div className="career">
                        <div className='role'>
                            <label htmlFor="role">Job Role</label>
                            <input type='text' id='role' placeholder='Enter Job role E.g. Software Engineer, Frontend Developer' name='jobRole' value={jobRole} onChange={onChange} />
                        </div>

                        <div className='job-type'>
                            <label htmlFor="job-type">Job type</label>
                            <input type="text" id='job-type' placeholder='Enter job Type  E.g. Full time, Part time, Internship' name='jobType' value={jobType} onChange={onChange} />
                        </div>

                        <div className='salary'>
                            <label htmlFor="salary">Salary Expectation</label>
                            <input type="number" id='salary' placeholder='Enter Salary Expectation' name='salary' value={salary} onChange={onChange} />
                        </div>
                    </div>

                </fieldset>

                <button className="btn" disabled={loading}>
                    {loading ? <Spinner /> : 'Save'}

                </button>
                {loading ? "Sending Data" : "Successfully Saved"}

            </form>

        </div>
    )
}
