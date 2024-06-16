import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilService from '../Services/ProfilService';
import './Profile.css'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'
import PostesAuthor from './PostesAuthor';

export default function Profile() {

    const token = Cookies.get('access_token');
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const user = JSON.parse(localStorage.getItem('user_data'))

    const fetchProfile = async () => {
        try {
            if (!token) {
                console.error('Token not found in cookies');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const response = await ProfilService.getProfilByAuthorId(user.id, headers)
            setProfile(response.data.profil);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        fetchProfile()
    }, []);

    return (
        <>
            <div className="container-Profi">
                <div className="profile-header">
                    <div className="profile-header-top">
                        <i className="gg--chevron-left" id="backButton"></i>
                        <h1 className="profile-header-title">Profil</h1>
                    </div>
                    <div className="profile-image">
                        {profile.pdp && (
                            <img src={`http://localhost:4000/${profile.pdp}`} alt="profile" style={{ width: '140px' }} />
                        )}
                    </div>
                    <div className="profile-user-info">
                        <div className="profile-user-header">
                            <h2 className="profile-user-name">{profile.nameInProfile}</h2>
                            <button className="primary profile-edit-btn" ><Link to={'/Settings'} style={{textDecoration: 'none', color: 'white'}}>Settings</Link> </button>
                        </div>
                        <div className="profile-bio">
                            <p><span className="profile-real-name">Hamza Bannour</span> {profile.bio} 📷✈️🏕️</p>
                        </div>
                        <div className="profile-stats">
                            <Link  style={{ textDecoration: 'none' }}><span><strong>{profile.nombrePostes}</strong> posts</span></Link>
                            <Link to={'/Followers'} style={{ textDecoration: 'none' }}><span><strong>{profile.nombreFollowers}</strong> followers</span></Link>
                            <Link to={'/Followings'} style={{ textDecoration: 'none' }}><span><strong>{profile.nombreFollowings}</strong> followings</span></Link>
                        </div>
                    </div>
                </div>
                <PostesAuthor />
            </div>
            
        </>
    )
}
