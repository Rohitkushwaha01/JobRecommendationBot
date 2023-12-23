import { React, useContext } from 'react'
import AuthContext from '../context/AuthenticationContext/auth.context'
import Spinner from './Spinner';
import { toast } from 'react-toastify'


export default function UserInfo() {
  const { currentUserDetails, fullUserInfo } = useContext(AuthContext);

  let info =  fullUserInfo();
  console.log(info)
  if (info == 'There is no userdetails for this user') {
    toast.error("No Data available")
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
    jobType } = currentUserDetails;

  return (
    <div className='curr-user-info'>
      <p>{fname}</p>
      <p>{lname}</p>
      <p>{dateOfBirth}</p>
      <p>{gender}</p>
      <p>{email}</p>
      <p>{mobileNo}</p>
      <p>{city}</p>
      <p>{jobLocation}</p>
      <p>{educationLevel}</p>
      <p>{fieldOfStudy}</p>
      <p>{graduationYear}</p>
      <p>{technicalSkill}</p>
      <p>{interests}</p>
      <p>{jobRole}</p>
      <p>{jobType}</p>
    </div>
  )
}
