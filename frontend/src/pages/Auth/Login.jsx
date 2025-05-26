import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail, validatePassword } from '../../utils/helper'

function Login() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)

  const navigate = useNavigate()

  const handlelogin = async (e) => {
    e.preventDefault()

    if(!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    

    if(!password){
      setError('Please enter your password')
      return
    }

    if(!validatePassword(password)) {
      setError('Password must be at least 6 characters long')
      return
    }



    setError(null)
    //login api call

  }
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'> Welcome Back
        </h3>
          <p className=' text-xs text-slate-700 mt-[5px] mb-6'>
            please enter your email and password to login
          </p>

          <form onSubmit={handlelogin}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
              placeholder='Enter your email'
              type='email'
              />
              <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label='Password'
              placeholder='Enter your password'
              type='password'
              />

              {error &&  <p className='text-red-500 text-xs pb-2.5 mt-2'>{error}</p>}

              <button type='submit' className='btn-primary'>LOGIN</button>

              <p className='text-[13px] text-slate-800 mt-3'>
                Don't have an account?{" "}
                <Link to='/signup' className='text-primary font-medium underline'>
                  Sign Up
                </Link>
              </p>
          </form>

      </div>
    </AuthLayout>
  )
}

export default Login
