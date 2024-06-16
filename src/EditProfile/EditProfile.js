import React, { useState, useRef, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import './EditProfile.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ProfilService from '../Services/ProfilService';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfile() {

    const token = Cookies.get('access_token');
    const navigate = useNavigate();
    const [connectedUser, setConnectedUser] = useState({});

    const pdpField = useRef()
    const nameInProfilField = useRef()
    const ageField = useRef()
    const birthdateField = useRef()
    const localField = useRef()
    const cityField = useRef()
    const bioField = useRef()
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
        } catch (error) {

        }
    }

    // Validation de Forumulaire
    const ValidateForm = async () => {

        // Récupérer les données de profil
        var formData = new FormData();
        formData.append('pdp', pdpField.current.files[0]);
        formData.append('nameInProfile', nameInProfilField.current.value);
        formData.append('age', ageField.current.value);
        formData.append('birthdate', birthdateField.current.value);
        formData.append('nationality', localField.current.value);
        formData.append('city', cityField.current.value);
        formData.append('bio', bioField.current.value);
        formData.append('authorProfile', connectedUser.id);
        let isFormValid = true

        if (isFormValid) {
            try {
                const profilId = profilInfo._id;
                const obj = {
                    name: nameInProfilField.current.value,
                    age: ageField.current.value,
                    birthdate: birthdateField.current.value,
                    nationality: localField.current.value,
                    city: cityField.current.value,
                    bio: bioField.current.value,
                    authorProfil: connectedUser.id
                }
                // console.log(obj)
                for (var [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                const response = await axios.post(`http://127.0.0.1:4000/Profil/${profilId}/update`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response)
                if (response.status === 200) {
                    toast.success(response.data)
                    navigate('/EditProfile');
                }
                else {
                    toast.error(response.data)
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
            <section className='container-EdP'>
                <div className="info-EdP">
                    <div className="user-EdP">
                        <FiChevronLeft id="backButton" className='gg--chevron-left'></FiChevronLeft>
                        <h1>Edit Profile</h1>
                    </div>
                </div>
                <div className="card-image-EdP" id="profile-image-container">
                    <img src={profilInfo.pdp} />
                    <input type="file" id="file-input" accept="image/*" style={{ display: 'block' }} ref={pdpField} />
                </div>
                <header>{profilInfo.nameInProfile}</header>
                <form onSubmit={handleSubmit} className="form-EdP">
                    <div className="input-box-EdP">
                        <label>Name</label>
                        <input type="text" defaultValue={profilInfo.nameInProfile} required ref={nameInProfilField} />
                    </div>
                    <div className="input-box-EdP">
                        <label>Age</label>
                        <input type="number" defaultValue={profilInfo.age} required ref={ageField} />
                    </div>
                    <div className="input-box-EdP">
                        <label>BirthDate</label>
                        <input type="date" defaultValue={profilInfo.birthdate} required ref={birthdateField} />
                    </div>

                    <div className="input-box-EdP address">
                        <label>Local</label>
                        <div className="column-EdP">
                            <div className="select-box-EdP">
                                <select defaultValue={profilInfo.local} ref={localField}>
                                    <option>Country</option>
                                    <option>America</option>
                                    <option>Japan</option>
                                    <option>India</option>
                                    <option>Nepal</option>
                                </select>
                            </div>
                            <input type="text" defaultValue={profilInfo.city} required ref={cityField} />
                        </div>
                    </div>
                    <div className="input-box-EdP">
                        <label>Bio</label>
                        <input type="text" defaultValue={profilInfo.bio} required ref={bioField} />
                    </div>
                    <button>Submit</button>
                </form>
            </section>
        </>
    )
}
