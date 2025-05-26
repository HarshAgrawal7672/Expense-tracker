import React from 'react'
import{FaRegEye ,FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = React.useState(false)
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }
  return (
    <div>
        <label className='text-[13px] text-slate-800'> {label}</label>
        <div className='input-box'>
            <input type={type=='password' ? (showPassword ? 'text' : 'password') : type}
            placeholder={placeholder}
            value={value}
            onChange={(e)=>onChange(e)}
            className='w-full bg-transparent outline-none' />

            {type === 'password' && (
                <>
                {showPassword ? (
                    <FaRegEye
                    size={22}
                    className='text-primary cursor-pointer'
                    onClick={()=> handleTogglePassword()}
                    />
                )
                    : (
                    <FaRegEyeSlash
                        size={22}
                        className='text-slate-400 cursor-pointer'
                        onClick={()=> handleTogglePassword()}
                        />
                    )}
                </>
            )}
        </div>
    </div>
  )
}

export default Input
