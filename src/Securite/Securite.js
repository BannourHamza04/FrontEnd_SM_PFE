import React, { useState, useRef, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ProfilService from '../Services/ProfilService';
import './Securite.css'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfile() {

    const token = Cookies.get('access_token');
    const navigate = useNavigate();
    const [connectedUser, setConnectedUser] = useState({});

    const emailField = useRef()
    const passwordField = useRef()
    const newPasswordField = useRef()
    const [profilInfo, setProfileInfo] = useState({})
    const user = JSON.parse(localStorage.getItem('user_data'))

    // Recuperer Anciens Données de Profile
    const RecuperateDataProfile = async () => {
        try {
            if (!token) {
                console.error('Token not found in cookies');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const userId = user.id;
            const response = await ProfilService.getProfilByAuthorId(userId, headers);
            setProfileInfo(response.data.profil)
            console.log(response.data.profil)
        } catch (error) { }
    }

    // Validation de Forumulaire
    const ValidateForm = async () => {
        const email = emailField.current.value
        const password = passwordField.current.value
        const newPassword = newPasswordField.current.value
        let isFormValid = true

        // Function Email Validation
        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        if (password.length < 8 || newPassword.length < 8) {
            alert('Password invalid, The Password must be at least 8 characters long ! ')
            isFormValid = false
        }

        if (!validateEmail(email)) {
            alert('Invalid email format ! ')
            isFormValid = false
        }

        if (isFormValid) {
            try {
                const compteUpdated = {
                    email: email,
                    newPassword: newPassword,
                    oldPassword: password
                }
                const userId = user.id
                const response = await axios.post(`http://127.0.0.1:4000/User/${userId}/update`, compteUpdated);
                if (response.status === 200) {
                    toast.error(response.data);
                }
                else {
                    toast.success(response.data);
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        ValidateForm()
    }



    useEffect(() => {
        if (!token) {
            navigate('/Login')
        }

        RecuperateDataProfile();
    }, []);

    return (
        <>
            <div>
                <ToastContainer position='top-center' />
            </div>
            <section className="container-Sec">
                <div className="info-EdP">
                    <div className="user-EdP">
                        <FiChevronLeft id="backButton" className='gg--chevron-left'></FiChevronLeft>
                        <h1>Securite</h1>
                    </div>
                </div>
                <div className="card-image-EdP" id="profile-image-container">
                    <img src={profilInfo.pdp} />
                </div>
                <header>{profilInfo.nameInProfile}</header>
                <form onSubmit={handleSubmit} className="form-EdP">
                    <div className="input-box-EdP">
                        <label> Email</label>
                        <input type="email" placeholder="Enter UserName" required ref={emailField} />
                    </div>
                    <div className="input-box-EdP">
                        <label>Your Password</label>
                        <input type="password" placeholder="" required ref={passwordField} />
                    </div>
                    <div className="input-box-EdP">
                        <label>New Password</label>
                        <input type="password" placeholder="" required ref={newPasswordField} />
                    </div>
                    <button>Submit</button>
                </form>
            </section>
        </>
    )
}
