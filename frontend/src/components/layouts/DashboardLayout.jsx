import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const DashboardLayout = ({children,activeMenu}) => {
    const {user}=useContext(UserContext)
    console.log("user", user);
  return (
    <div className="">
      <NavBar activeMenu={activeMenu} />

      {user && (<div className="flex">
            <div className="max-[1080px]:hidden">
                <SideBar activeMenu={activeMenu} />

            </div>

            <div className="grow mx-5">
                {children}

            </div>
        </div>)}
    </div>
  );
};

export default DashboardLayout;
