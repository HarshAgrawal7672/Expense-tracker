import React,{useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail, validatePassword } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'


const Signup = () => {
  const [profilepic, setProfilePic] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const naviagte= useNavigate()
  // Function to handle signup form

  const handleSignup = async (e) => {
    e.preventDefault()
    let profileimgURL=""
    if(!name) {
      setError('Please enter your name')
      return
    }
    if(!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    if(!password) {
      setError('Please enter your password')
      return
    }
    if(!validatePassword(password)) {
      setError('Password must be at least 6 characters long')
      return
    }
    setError(null)

    //signup api call

  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>
          Create an Account
        </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to create an account
        </p>

        <form onSubmit={handleSignup}>

          <ProfilePhotoSelector image={profilepic} setImage={setProfilePic} />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label='Name'
            placeholder='Enter your name'
            type='text'
          />
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

          {error && <p className='text-red-500 text-xs pb-2.5 mt-2'>{error}</p>}

          <button type='submit' className='btn-primary'>SIGN UP</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link to='/login' className='text-primary font-medium underline'>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
