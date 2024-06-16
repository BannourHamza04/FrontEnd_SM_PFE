import React, { useEffect, useRef, useState } from 'react';
import PostService from '../Services/PostService';
import Poste from './Poste'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Commentaire from './Commentaire'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Commentaires() {

    const token = Cookies.get('access_token');
    const author = JSON.parse(localStorage.getItem('user_data'))
    const [comments, setComments] = useState([]);
    const { postId } = useParams();
    const navigate = useNavigate();

    const fetchComments = async () => {
        try {
            const response = await PostService.getCommentsPost(postId)
            setComments(response.data.commentaires);
            console.log(comments)
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // Affichage des Commentaires
    const displayComments = () => {
        if (comments.length === 0) {
            return <p> Aucun Commentaire trouvé </p>;
        } else {
            return comments.map((comment, key) => {
                return <Commentaire comment={comment} key={key} />;
            });
        }
    };

    // Add Commentaire
    const commentField = useRef()

    const ValidateForm = async () => {

        const commentaire = commentField.current.value.trim()
        let isFormValid = true

        if (!commentaire) {
            isFormValid = false;
            toast.error('The content of the comment cannot be empty or contain only spaces.');
        }

        if (isFormValid) {
            try {
                const idAuthor = author.id;
                const comment = {
                    content: commentaire,
                    authorComment: idAuthor
                }
                const response = await PostService.addCommentToPost(postId, comment);
                console.log(response)
                if (response.status === 200) {
                    // toast.success(response.data)
                    window.location.reload();
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
        fetchComments()
    }, []);

    return (
        <>
            <div>
                <ToastContainer position='top-center' />
            </div>
            <div className="post-comment">
                <div className="head">
                    <div className="name">Comments</div>
                    <label htmlFor="" className="comment-btn3" >
                    </label>
                </div>
                <div className="comments">
                    {displayComments()}
                </div>
                <div className="new-comment">
                    <form onSubmit={handleSubmit} className="new-comment" >
                        <img src="/imgs/images/img/smile.PNG" alt="" />
                        <input type="text" placeholder="Add a comment..." ref={commentField} />
                        <input type="submit" style={{ color: 'white', background: 'blue', width: 30 + '%', cursor: 'pointer' }} />
                    </form>
                </div>
            </div>
        </>
    )
}
