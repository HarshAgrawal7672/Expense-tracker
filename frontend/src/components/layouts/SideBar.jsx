import React from 'react'
import { SIDE_BAR_MENU } from '../../utils/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

import blank_profile from "../../assets/images/blank_profile.jpg"

const SideBar = ({activeMenu}) => {
    const {user, clearUser} = React.useContext(UserContext)
    console.log("user", user);
    const navigate = useNavigate()

    const handleclick=(route)=>{
      console.log("route", route);
      if(route === 'logout'){
        clearUser()
        localStorage.removeItem('token')
        navigate('/login')
      }else{
      navigate(route)

      }
    }

    const handleLogout = () => {
      clearUser()
      localStorage.removeItem('token')
      navigate('/login')
    }
  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
      {user?.profileImageurl?(
        <img
        src={ user?.profileImageurl || blank_profile}
        alt={user?.fullName || ""}
        className='w-20 h-20 bg-slate-400 rounded-full '
        />):<></>
      }

      <h5 className=' text-gray-950 font-medium leading-6'>
        {user?.fullName || ""}

      </h5>
      
    </div>

    {SIDE_BAR_MENU.map( (item,index)=>(
      <button
      key={index}
      className={`flex w-full items-center gap-4 text-[15px] ${activeMenu == item.label ? "text-white bg-primary":""} py-3 px-6 rounded-lg mb-3`}
      onClick={() => handleclick(item.path)}
      >
        <item.icon className='text-xl ' />
        {item.label}
      </button>
    ))}


    </div>
    
    
  )
}

export default SideBar
