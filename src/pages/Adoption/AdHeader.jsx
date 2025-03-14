import React from 'react'
import { Link } from 'react-router-dom'
import { FaPaw, FaSignOutAlt, FaCommentDots, FaDog } from 'react-icons/fa'
import { HiUserCircle } from 'react-icons/hi2';

import './header.css'

function AdHeader() {
    return (
        <>
            <header className="adoption-header">
                {/* Top Navigation Bar */}
                <nav className="header-nav">
                    <div className="nav-brand">
                        <img src="animal1.png" className='' width={'40px'} height={'40px'} alt="" />
                        <span>TheVelvetPaw</span>
                    </div>

                    <div className="nav-links">
                        <Link to="/home" className="nav-link">Home</Link>
                        <Link to="/pets" className="nav-link">
                            <FaDog className="nav-icon" />
                            Pets
                        </Link>
                        <Link to="/testimonials" className="nav-link">
                            <FaCommentDots className="nav-icon" />
                            Testimonials
                        </Link>

                        <Link to="/testimonials" className="nav-link">
                            <HiUserCircle
                                
                                className="nav-icon"
                                
                            />
                            profile
                        </Link>
                    </div>

                    <button className="logout-btn">
                        <FaSignOutAlt />
                        Logout
                    </button>
                </nav>

            </header>


        </>
    )
}

export default AdHeader