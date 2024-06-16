import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Auth from '../Services/Auth';

export default function NavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate('/Login');
  };

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <h3>THE ATHLETIC</h3>
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

          <div className="icon user-profile" alt="" onClick={toggleMenu}>
            {showMenu && (<ul className="profile-dropdown-list">
              <li className="profile-dropdown-list-item">
                <Link to='/EditProfile' >
                  <i className="fa-regular fa-user"></i>
                  Edit Profile
                </Link>
              </li>
              <li className="profile-dropdown-list-item">
                <Link to='/Profile' >
                  <i className="fa-regular fa-user"></i>
                  My Profile
                </Link>
              </li>
              <li className="profile-dropdown-list-item">
                <Link to="/Securite" >
                  <i className="fa-solid fa-chart-line"></i>
                  Securite
                </Link>
              </li>
              <li className="profile-dropdown-list-item">
                <Link to="/Settings">
                  <i className="fa-solid fa-sliders"></i>
                  Settings
                </Link>
              </li>
              <li className="profile-dropdown-list-item">
                <Link to="/Login" onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  Log out
                </Link>
              </li>
            </ul>)}
          </div>
        </div>
      </div>
    </nav>

  );
}
