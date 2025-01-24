import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from 'lucide-react';


const MainNav = () => {

  // javascript
  const carts = useEcomStore((state) => state.carts)
  const user = useEcomStore((state) => state.user)
  const logout = useEcomStore((state) => state.logout)
  // console.log(Boolear(user))
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    
  }

  // console.log(carts.length)
  return (
    <nav className="bg-[#9796f0] shadow-2xl">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-200 px-2 py-1 rounded-md text-sm font-medium '
                  : 'hover:bg-slate-200 px-2 py-1 rounded-md text-sm font-medium'
              }
              to={"/"}
            >Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-200 px-2 py-1 rounded-md text-sm font-medium'
                  : 'hover:bg-slate-200 px-2 py-1 rounded-md text-sm font-medium'
              }
              to={"/shop"}
            >Shop
            </NavLink>

            {/* Badge */}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-200 px-2 py-1 rounded-md text-sm font-medium'
                  : 'hover:bg-slate-200 px-2 py-1 rounded-md text-sm font-medium'
              }

              to={"cart"} >
              Cart
              {carts.length > 0
                && (<span className="absolute top-0 bg-red-500
                rounded-full px-2">{carts.length}</span>)
              }
            </NavLink>
          </div>

              {
                user 
                ? <div className="flex items-center gap-4 z-10">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:bg-gray-200 px-2 py-2 rounded-md ">
              <img
                className="w-9 h-9 rounded-md"
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1734942874~exp=1734946474~hmac=e878fb3a240ec5bef464ae91774b7a8fec495b277d80e9e8e92b4d70924fb09c&w=740" />

              <ChevronDown />
            </button>

            {
              isOpen && (
                <div className="absolute top-16 bg-white shadow-md">
                  <Link
                    to={"/user/history"}
                    className=" block px-4 py-2 hover:bg-gray-200">
                    History
                  </Link>
                  <Link
                    to={"/"}
                    onClick={() => logout()}
                    className=" block px-4 py-2 hover:bg-gray-200">
                    Logout
                  </Link>
                </div>
              )
            }
          </div>
                : <div className="flex items-center gap-4">
          <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-200 px-2 py-1 rounded-md text-sm font-medium'
                  : 'hover:bg-slate-200 px-2 py-1 rounded-md text-sm font-medium'
              }
            to={"/register"}>
              Register
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-200 px-2 py-1 rounded-md text-sm font-medium'
                  : 'hover:bg-slate-200 px-2 py-1 rounded-md text-sm font-medium'
              }
            to={"/login"}>
              Login
            </NavLink>
          </div>
              }      

        </div>
      </div>
    </nav>
  );
};

export default MainNav;
