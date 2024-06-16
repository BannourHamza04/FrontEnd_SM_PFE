import React ,{ useRef, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import  './EditProfile.css';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProfil() {

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

    const ValidateForm = async () => {

        // Récupérer les données de l'image de profil
        const formData = new FormData();
        formData.append('pdp', pdpField.current.files[0]);
        formData.append('nameInProfile', nameInProfilField.current.value);
        formData.append('age', ageField.current.value);
        formData.append('birthdate', birthdateField.current.value);
        formData.append('nationality', localField.current.value);
        formData.append('city', cityField.current.value);
        formData.append('bio', bioField.current.value);
        formData.append('authorProfile', connectedUser.id);
        let isFormValid = true

        if(isFormValid){
        try{
            const response = await axios.post('http://127.0.0.1:4000/Profil/Ajouter', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            if(response.status === 200){
                toast.success(response.data)
                navigate('/Profile');
            }
            else{
                toast.error(response.data)
            }
        }catch(err){
            console.log(err)
        }
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        ValidateForm()
    }

    useEffect(() => {
        if(!token){
            navigate('/Login')
        }
        setConnectedUser(JSON.parse(localStorage.getItem('user_data')))
    }, []);
    
    return (
        <>
            <div>
                <ToastContainer position='top-center' />
            </div>
        <section className='container-EdP'>
            <div className="info-EdP">
                <div className="user-EdP">
                <FiChevronLeft  id="backButton" className='gg--chevron-left'></FiChevronLeft>
                    <h1>Create your Profile </h1>
                </div>
            </div>
            <div className="card-image-EdP" id="profile-image-container">
            <input type="file" id="file-input" accept="image/*" style={{ display: 'block' }} ref={pdpField}/>
            </div>
            <header>Hamza Bannour</header>
            <form onSubmit={handleSubmit} className="form-EdP">
                <div className="input-box-EdP">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your Name" required ref={nameInProfilField} />
                </div>
                <div className="input-box-EdP">
                    <label>Age</label>
                    <input type="number" placeholder="Enter your Age" required ref={ageField} />
                </div>
                <div className="input-box-EdP">
                    <label>BirthDate</label>
                    <input type="date" placeholder="Enter birth date" required ref={birthdateField} />
                </div>

                <div className="input-box-EdP address">
                    <label>Local</label>
                    <div className="column-EdP">
                        <div className="select-box-EdP">
                            <select ref={localField}>
                                <option hidden>Country</option>
                                <option>America</option>
                                <option>Japan</option>
                                <option>India</option>
                                <option>Nepal</option>
                            </select>
                        </div>
                        <input type="text" placeholder="Enter your city" required ref={cityField} />
                    </div>
                </div>
                <div className="input-box-EdP">
                    <label>Bio</label>
                    <input type="text" placeholder="Enter your Bio" required ref={bioField} />
                </div>
                <button>Submit</button>
            </form>
            
        </section>
        </>
    )
}
