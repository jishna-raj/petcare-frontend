import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaPaw, FaSignOutAlt, FaCommentDots, FaDog } from 'react-icons/fa'
import { HiUserCircle } from 'react-icons/hi2';

import './header.css'


function AdHeader() {


    const [token,settToken] =useState("")

    const navigate = useNavigate()

  const logout =async()=>{
    sessionStorage.removeItem('adoptionUser')
    sessionStorage.removeItem('adoptionToken')

    navigate('/')
  }

  useEffect(()=>{
    if(sessionStorage.getItem("adoptionToken"))
      settToken(sessionStorage.getItem("adoptionToken"))
  },[])

    return (
        <>
            <header className="adoption-header">
                {/* Top Navigation Bar */}
                <nav className="header-nav">
                    <div className="nav-brand">
                        <img src="animal1.png" className='' width={'40px'} height={'40px'} alt="" />
                        <span>TheVelvetPaw</span>
                    </div>

                   {token && <div className="nav-links">
                        <Link to="/home" className="nav-link">Home</Link>
                        <Link to="/pets" className="nav-link">
                            <FaDog className="nav-icon" />
                            Pets
                        </Link>
                        <Link to="/testimonials" className="nav-link">
                            <FaCommentDots className="nav-icon" />
                            Testimonials
                        </Link>

                        <Link to="/adoption-profile" className="nav-link">
                            <HiUserCircle
                                
                                className="nav-icon"
                                
                            />
                            profile
                        </Link>
                    </div>}

                    <button className="logout-btn" onClick={logout}>
                        <FaSignOutAlt />
                        Logout
                    </button>
                </nav>

            </header>


        </>
    )
}

export default AdHeader