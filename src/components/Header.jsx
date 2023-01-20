import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/AppContext";
import Loader from "../shared/loader";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, mobileMenu, setMobileMenu} = useContext(Context);
  const navigate = useNavigate();

  const searchQueryHandler = (e) => {
    if ((e?.key === "Enter" || e === "searchButton") && searchQuery.length > 0) {
      console.log('search query handler');
      navigate(`/searchResult/${searchQuery}`);
    }
  }

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  }

  return (
    <div className="sticky top-0 flex items-center justify-between  text-white bg-black h-14 px-4 md:px-5">
      { loading && <Loader /> }
      <div className='flex items-center h-5'>
        <div className="flex md:hidden justify-center items-center h-10 w-10 cursor-pointer rounded-full" onClick={mobileMenuToggle}>
          {mobileMenu ? (<CgClose className="text-white text-xl" />):(<SlMenu className="text-white text-xl" />)}
        </div>
        <Link to='/' className='flex h-5 items-center'>
          <img src={ytLogo} className="h-full cursor-pointer hidden md:block" />
          <img src={ytLogoMobile} className="h-full cursor-pointer block md:hidden" />
        </Link>
      </div>

      <div className="group flex items-center flex-row">
        <div className="h-8 md:h-10 ml-10 flex border-2 border-white/20 rounded-l-3xl pt-1 px-2">
          <div className='w-10 flex justify-center items-center'>
            <IoIosSearch className='text-white text-xl' />
          </div>
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
            className='w-20 sm:w-44 md:64 lg:w-[500px] rounded-full outline-none text-white bg-transparent p-1'
          />
        </div>
        <button
          className='bg-white/[0.1] h-8 md:h-10 w-[40px] flex justify-center items-center rounded-r-3xl border border-l-0 border-white/20'>
          <IoIosSearch />
        </button>
      </div>


      <div className="hidden md:flex flex-row justify-center items-center gap-x-6">
        <div className='flex justify-center items-center'>
          <RiVideoAddLine className='text-white text-xl cursor-pointer' />
        </div>
        <div className='flex justify-center items-center'>
          <FiBell className='text-white text-xl cursor-pointer' />
        </div>
        <div className='flex justify-center items-center h-8 w-8 overflow-hidden rounded-full'>
          <img src='https://xsgames.co/randomusers/assets/avatars/male/63.jpg' />
        </div>
      </div>

    </div>
  )
}

export default Header