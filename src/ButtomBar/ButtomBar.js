import React from 'react'
import './ButtomBar.css'
import { Link } from 'react-router-dom'
export default function ButtomBar() {
  return (
    <nav className="Bottombar">
      <div className="nav-wrapper">
        <input type="text" className="search-box" placeholder="search" />
        <div className="nav-items">
        <Link to="/">
            <img src="\imgs\images\img\home.png" className="icon" alt="" />
          </Link>
          <Link to="/Search">
            <img src="\imgs\images\img\search.png" className="icon" alt="" />
          </Link>
          <Link to='/AddPost'>
            <img src="\imgs\images\img\add.PNG" className="icon" alt="" />
          </Link>
          <Link to='/Notifications'>
            <img src="\imgs\images\img\notification.png" className="icon" alt="" />
          </Link>
          <Link to='/Profile'>
            <div className="icon user-profile"></div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
