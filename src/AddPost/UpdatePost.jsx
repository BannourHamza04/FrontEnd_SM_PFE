import React, { useRef, useEffect } from 'react';
import './AddPost.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostService from '../Services/PostService';
import { useParams } from 'react-router-dom'

export default function UpdatePost() {

    const token = Cookies.get('access_token');
    const navigate = useNavigate();
    const [connectedUser, setConnectedUser] = useState({});
    const { postId } = useParams();
    const contentPostField = useRef()
    const [post, setPost] = useState({});

    const getPost = async () => {
        try {
            const response = await PostService.findPostById(postId)
            setPost(response.data.post);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    const ValidateForm = async () => {

        // Récupérer les données de l'image de profil
        const content = contentPostField.current.value.trim();
        let isFormValid = true

        if (!contentPostField.current.value.trim()) {
            isFormValid = false;
            toast.error('The content of the post cannot be empty or contain only spaces.');
        }

        if (isFormValid) {
            try {
                const Contentpost = {
                    content: content,
                }
                const response = await PostService.updatePost(postId,Contentpost);
                if (response.status === 200) {
                    toast.success(response.data)
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
        getPost()

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
                        <input className="content-post-AddP" type="text" defaultValue={post.content} required ref={contentPostField} />
                    </div>
                    <input className="input-submit-AddP" type="submit" value="Update" />
                </form>
            </div>
        </div>
    </>
    )
}
