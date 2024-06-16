import React, { useEffect, useState } from 'react';
import './Poste.css'
import { Link } from 'react-router-dom'
import PostService from '../Services/PostService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function Poste({ post }) {

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const renderMedia = () => {
        if (!post.image) {
            return null;
        }

        const fileExtension = post.image.split('.').pop().toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const videoExtensions = ['mp4', 'webm', 'ogg'];

        if (imageExtensions.includes(fileExtension)) {
            return <img src={`http://localhost:4000/${post.image}`} className="post-image" alt="Post" style={{ maxWidth: '100%' }} />;
        } else if (videoExtensions.includes(fileExtension)) {
            return (
                <video controls className="post-video" style={{ maxWidth: '100%' }}>
                    <source src={post.image} type={`video/${fileExtension}`} />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return <p>Unsupported file type</p>;
        }
    };

    // ---------------------------------------Like --------------------------------------------

    const [like, setLike] = useState('');
    const liker = JSON.parse(localStorage.getItem('user_data'))

    // Verify Like
    const verifierLike = async () => {
        try {
            const postId = post._id
            const likerId = liker.id
            const response = await PostService.ifIsLikePost(postId, likerId)
            if (response.data == true) {
                setLike(true)
            }
            else {
                setLike(false)
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    // Like
    const Like = async () => {
        try {
            const postId = post._id
            const likerId = liker.id
            const response = await PostService.likeAndDisLike(postId, likerId)
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const toggleLike = async () => {
        setLike(!like);
        await Like()
    };

    useEffect(() => {
        verifierLike()
    }, [like]);

    // ------------------------------------------- isAuthorPost -----------------------------------------

    const author = JSON.parse(localStorage.getItem('user_data'))
    const [isAuthorPost, setIsAuthorPost] = useState('')

    // Verify Like
    const ifIsAuthor = async () => {
        try {
            const postId = post._id
            const authorId = author.id
            const response = await PostService.isAuthorPost(postId, authorId)
            if (response.status == 200) {
                setIsAuthorPost(response.data)
            }
            else {
                console.log(response.data)
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    useEffect(() => {
        ifIsAuthor();
    }, []);

    // -----------------------------------------Delete Post -----------------------------------------------
    const deletePost = async () => {
        try {
            const postId = post._id
            const response = await PostService.deletePost(postId);
            if (response.status === 200) {
                toast.success(response.data);
            }
            else {
                toast.error('Error deleting post !');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const confirmDelete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this post?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deletePost()
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    return (
        <>
            <div>
                <ToastContainer position='top-center' />
            </div>
            <div>
                <section className="main">
                    <div className="wrapper">
                        <div className="left-col">
                            <div className="post">
                                <div className="info">
                                    <div className="user">
                                        {!isAuthorPost ? (
                                            <Link to={`/ProfilFriend/${post.authorPost._id}`}>
                                                <div className="profile-pic"><img src={`http://localhost:4000/${post.authorPost.pdp}`} alt="" style={{ height: '40px', width: '40px', padding: '0', background: 'none', borderRadius: '50%' }} /></div>
                                            </Link>
                                        ) : (
                                            <Link to={`/Profile`}>
                                                <div className="profile-pic"><img src={`http://localhost:4000/${post.authorPost.pdp}`} alt="" style={{ height: '40px', width: '40px', padding: '0', background: 'none', borderRadius: '50%' }} /></div>
                                            </Link>
                                        )}
                                        <p className="username">{post.authorPost.nameInProfile}</p>
                                    </div>

                                    {isAuthorPost && (
                                        <>
                                            <img src="/imgs/images/img/option.PNG" className="options" alt="" onClick={toggleMenu} />
                                            {showMenu && (
                                                <div className="dropdown-menu">
                                                    <ul>
                                                        <li onClick={confirmDelete}>Delete Post</li>
                                                        <Link to={`/UpdatePost/${post._id}`} style={{ textDecoration: 'none', color: 'black' }}><li>Update Post</li></Link>
                                                    </ul>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="post-content">
                                    <div className="reaction-wrapper">
                                        <p className="description">{post.content}</p>
                                    </div>
                                </div>
                                {renderMedia()}

                                <input
                                    type="checkbox"
                                    id={`like-${post._id}`}
                                    className="btn-P like"
                                    checked={like}
                                    onChange={toggleLike}
                                    style={{ display: 'none' }}
                                />

                                <input type="checkbox" name="" className="btn-P commentt" />
                                <div className="post-content">
                                    <div className="reaction-wrapper" style={{
                                        justifyContent: 'center',
                                        marginLeft: -7 + 'px'
                                    }}>
                                        <label
                                            htmlFor={`like-${post._id}`}
                                            className="like-btn"
                                            style={{ color: like ? 'red' : 'inherit' }}
                                        ></label><p className="likes">{post.nombreLikes} likes</p>
                                        <Link to={`/Commentaires/${post._id}`} style={{ marginLeft: 10 + 'px' }}>
                                            <label htmlFor="comment1" className="comment-btnn" ></label>
                                        </Link>
                                        <p className="likes" style={{ marginLeft: 15 + 'px' }}>{post.nombreComments} comments</p>
                                    </div>
                                    {/* <p className="post-time">2 minutes ago</p> */}
                                </div>
                                <div className="comment-wrapper"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
