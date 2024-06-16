import React, { useRef, useEffect } from 'react';
import './AddPost.css'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPost() {

    const token = Cookies.get('access_token');
    const navigate = useNavigate();
    const [connectedUser, setConnectedUser] = useState({});

    const imgPostField = useRef()
    const contentPostField = useRef()

    const ValidateForm = async () => {

        // Récupérer les données de l'image de profil
        const formData = new FormData();
        formData.append('image', imgPostField.current.files[0]);
        formData.append('content', contentPostField.current.value.trim());
        let isFormValid = true

        if (!contentPostField.current.value.trim()) {
            isFormValid = false;
            toast.error('The content of the post cannot be empty or contain only spaces.');
        }

        if (isFormValid) {
            try {
                const idAuthor = connectedUser.id;
                const response = await axios.post(`http://127.0.0.1:4000/Post/${idAuthor}/Ajouter`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response)
                if (response.status === 200) {
                    toast.success(response.data)
                    // navigate('/');
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
        setConnectedUser(JSON.parse(localStorage.getItem('user_data')))
    }, []);


    return (
        <>
            <div>
                <ToastContainer position='top-center' />
            </div>
            <div className="container-AddP">
                <div className="form-AddP">
                    <div className="title-AddP">
                        <span className="gg--chevron-left" id="backButton"></span>
                        <h2 style={{ color: 'orange' }}>Create Post</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group-AddP">
                            <label htmlFor="content" className="label-content-AddP">Post content :</label>
                            <input className="content-post-AddP" type="text" placeholder="Add your post content" required ref={contentPostField} />
                        </div>
                        <div className="input-group-AddP">
                            <label htmlFor="upload-img" style={{ cursor: 'pointer', color: 'orange', margin: 5 + 'px', fontSize: 16 + 'px' }}> Click to Choose your image post.</label>
                            <input type="file" accept="image/*,video/*" id="upload-img" ref={imgPostField} required />
                        </div>
                        <input className="input-submit-AddP" type="submit" value="Create" />
                    </form>
                </div>
            </div>
        </>
    )
}
