import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthenticationContext/auth.context'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PrivateRoute from './routing/PrivateRoute'
import Dashboard from './pages/Dashboard'
import ChatWindow from './component/ChatWindow'
import UserDetailsForm from './component/UserDetailsForm'
import UserInfo from './component/UserInfo'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from './pages/PageNotFound'

function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<PageNotFound />} />
            <Route path='/' element={<HomePage />} >
              <Route path='login' element={<LoginPage />} />
              <Route path='signup' element={<SignupPage />} />
            </Route>
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} >
              <Route index path='chatwindow' element={<ChatWindow />} />
              <Route path='job-data' element={<UserDetailsForm />} />
              <Route path='curr-user-info' element={<UserInfo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
