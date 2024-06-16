import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ProfilService from '../Services/ProfilService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Following({ user }) {

    const [abonne, setAbonne] = useState();
    const author = JSON.parse(localStorage.getItem('user_data'))

    // Verify Following
    const verifierFollow = async () => {
        try {
            const followingId = user._id
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
            const followingId = user._id
            const authorId = author.id
            console.log(followingId)
            const response = await ProfilService.unFollow(authorId, followingId)
            if (response.status == 200) {
                toast.success(response.data)
                // window.location.reload();
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
            const followingId = user._id
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

    return (
        <>
            <div>
                <ToastContainer position='top-center' />
            </div>
            <div className="info-Notif">
                <div className="user-Notif">
                    <Link to={`/ProfilFriend/${user._id}`}>
                        <div className="profile-pic-Notif"><img src={user.pdp} alt="" style={{
                            height: '40px',
                            width: '40px',
                            padding: '0',
                            background: 'none',
                            borderRadius: '50%'
                        }} /> </div>
                    </Link>
                    <p className="username-Notif"><span>{user.nameInProfile}</span> <br />
                        {user.city}</p>

                </div>
                <button className="button button3" style={{ backgroundColor: abonne ? 'red' : 'blue' }} onClick={toggleAbonnement}>
                    {abonne ? 'Unfollow' : 'Follow'}</button>
            </div>
        </>
    )
}
