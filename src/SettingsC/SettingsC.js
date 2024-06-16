import React from 'react'
import './SettingsC.css'
import { Link } from 'react-router-dom'

export default function SettingsC() {
    return (
        <section className="main-Sett">
            <div className="wrapper-Sett">
                <div className="left-col">
                    <div className="post-Sett">
                        <div className="info-Sett">
                            <div className="user-Sett">
                                <span className="gg--chevron-left" id="backButton"></span>
                                <h1>Settings</h1>
                            </div>
                        </div>
                        <div className="info-Sett">
                            <div className="user-Sett profile-dropdown-list-item">
                                <i className="fa-regular fa-user" style={{fontweight: 'bold'}}></i>
                                <Link to="/EditProfile">
                                    <p className="username-Sett"><span>Edit Profile</span></p>
                                </Link>
                            </div>
                        </div>

                        <div className="info-Sett">
                            <div className="user-Sett profile-dropdown-list-item">
                                <i className="fa-solid fa-sliders"></i>
                                <Link to="/Settings">
                                    <p className="username-Sett"><span>Settings</span></p>
                                </Link>
                            </div>

                        </div>

                        <div className="info-Sett">
                            <div className="user-Sett profile-dropdown-list-item">
                                <i className="fa-solid fa-chart-line"></i>
                                <Link to="/Securite">
                                    <p className="username-Sett"><span>Securite</span></p>
                                </Link>
                            </div>
                        </div>

                        <div className="info-Sett">
                            <div className="user-Sett profile-dropdown-list-item">
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <Link to="/Login">
                                    <p className="username-Sett"><span>Logout</span></p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
