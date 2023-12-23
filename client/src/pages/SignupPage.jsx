import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthenticationContext/auth.context'
import Spinner from '../component/Spinner';
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

export default function SingupPage() {

  const { register, isAuthenticated, currentUserName } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // New loading state


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    let message = await register(name, email, password);

    if (message == 'User already exists') {
      toast.error(message)
    }
    setLoading(false);
  }

  if(isAuthenticated){
    toast.success(`Registration Successfull 🥳`, {
      toastId: 'reg1',
    })
    return <Navigate to='/dashboard/chatwindow'/>
  }

  return (
    <div className='flex-box'>
      <h1>Create your Account</h1>
      <form onSubmit={onSubmit} className='flex-box'>
        <input type="text" placeholder='Name' onChange={onChange} value={name} name='name'/>
        <input type="email" placeholder='Email address' onChange={onChange} value={email} name='email'/>
        <input type="password" placeholder='Password' onChange={onChange} value={password} name='password'/>
        <button className="btn" disabled={loading}>
          {loading ? <Spinner /> : 'Sign up'}
        </button>
      </form>

      <p>Don't have an account? <Link to='/login'>Log in</Link></p>
    </div>
  )
}
