import React from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'
import SideBar from "./SideBar"

const NavBar = ({activeMenu}) => {
  const [openSideBar, setOpenSideBar] = React.useState(false)
  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50  backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
      <button className='block lg:hidden text-black' onClick={() => setOpenSideBar(!openSideBar)}>
        {openSideBar ? <HiOutlineX className='text-2xl' /> : <HiOutlineMenu className='text-2xl' />}
      </button>

      <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>

      {openSideBar && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <SideBar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default NavBar
