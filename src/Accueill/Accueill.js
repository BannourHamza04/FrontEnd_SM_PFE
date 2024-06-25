import React from 'react'
import './Accueill.css'
import { Link } from 'react-router-dom'

export default function Accueill() {

    return (
        <>
            <div className="header">
                <div className="container-Acc">
                    <h2>THE ATHLETIC</h2>
                    <div className="links">
                        <span className="icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <ul>
                            <li><Link to={'/Login'}>Login</Link></li>
                            <li><Link to={'/Register'}>Register</Link></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div className="landing">
                <div className="intro-text">
                    <h1>Welcome to our Web App</h1>
                    <p> Transform your life with our personalized fitness programs tailored for all levels. Join our community and start your journey towards better health and well-being today with Your Friends.</p>
                </div>
            </div>
        </>
    )
}
