import React, { useState, useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthenticationContext/auth.context';
import Spinner from '../component/Spinner';
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode';

export default function LoginPage() {

  const { login, isAuthenticated, currentUserName } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // New loading state


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let message = await login(email, password)

    if (message == 'Password Incorrect!') {
      toast.error(message)
    }

    setLoading(false);
  }

  if (isAuthenticated) {
    toast.success(`Welcome ${currentUserName} 🥳`, {
      toastId: 'success1',
    })
    return <Navigate to="/dashboard/chatwindow" />
  }

  return (
    <div className='flex-box'>
      <h1>Welcome Back</h1>
      <form onSubmit={onSubmit} className='flex-box login-form'>
        <input type="email" placeholder='Email address' onChange={onChange} value={email} name='email' />
        <input type="password" placeholder='Password' onChange={onChange} value={password} name='password' />
        <button className="btn" disabled={loading}>
          {loading ? <Spinner /> : 'Sign In'}
        </button>
      </form>
      <p>Don't have an account? <Link to='/signup'>sign up</Link></p>
    </div>
  )
}
