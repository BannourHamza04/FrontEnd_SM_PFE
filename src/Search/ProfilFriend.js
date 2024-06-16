import React, { useEffect, useState } from 'react';
import './ProfilFriend.css'
import { Link, useParams } from 'react-router-dom'
import ProfilService from '../Services/ProfilService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsUsers from './PostsUsers';

export default function ProfilFriend() {

    const navigate = useNavigate();
    const token = Cookies.get('access_token');
    const { profilId } = useParams();
    const [profile, setProfile] = useState({});

    const fetchProfile = async () => {
        try {
            const response = await ProfilService.getProfilById(profilId)
            setProfile(response.data.profil);
            console.log(profile)
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // ------------------------------------------------------------------------------

    const [abonne, setAbonne] = useState();
    const author = JSON.parse(localStorage.getItem('user_data'))

    // Verify Following
    const verifierFollow = async () => {
        try {
            const followingId = profilId
            const authorId = author.id
            const response = await ProfilService.ifIsFollowing(authorId, followingId)
            if (response.data == true) {
                setAbonne(true)
            }
            else {
                setAbonne(false)
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    const fonctionPourBoutonRouge = async () => {
        try {
            const followingId = profilId
            const authorId = author.id
            console.log(followingId)
            const response = await ProfilService.unFollow(authorId, followingId)
            if (response.status === 200) {
                toast.success(response.data)
            }
            else {
                console.log(response.data)
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // Follow
    const fonctionPourBoutonBleu = async () => {
        try {
            const followingId = profilId
            const authorId = author.id
            console.log(followingId)
            const response = await ProfilService.follow(authorId, followingId)
            if (response.status == 200) {
                toast.success(response.data)
            }
            else {
                console.log(response.data)
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const toggleAbonnement = async () => {
        setAbonne(!abonne);
        if (abonne) {
            await fonctionPourBoutonRouge();
        } else {
            await fonctionPourBoutonBleu();
        }
    };

    useEffect(() => {
        verifierFollow()
    }, [abonne]);

    useEffect(() => {
        fetchProfile()
    }, []);

    return (
        <>
            <div>
                <ToastContainer position='top-center' />
            </div>
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
                            <button className="button button3" style={{ backgroundColor: abonne ? 'red' : 'blue' }} onClick={toggleAbonnement}>
                                {abonne ? 'Unfollow' : 'Follow'}</button>
                        </div>
                        <div className="profile-bio">
                            <p><span className="profile-real-name">Hamza Bannour</span> {profile.bio} 📷✈️🏕️</p>
                        </div>
                        <div className="profile-stats">
                            <Link  style={{ textDecoration: 'none' }}><span><strong>{profile.nombrePostes}</strong> posts</span></Link>
                            <Link  style={{ textDecoration: 'none' }}><span><strong>{profile.nombreFollowers}</strong> followers</span></Link>
                            <Link style={{ textDecoration: 'none' }}><span><strong>{profile.nombreFollowings}</strong> followings</span></Link>
                        </div>
                    </div>
                </div><PostsUsers />
            </div>
            
        </>
    )
}
