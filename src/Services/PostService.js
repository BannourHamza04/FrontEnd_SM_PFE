import axios from 'axios'
import Cookies from 'js-cookie';

const PostService = {}
const token  = localStorage.getItem('token')
const headers = {
    'Authorization': `Bearer ${token}`
};

PostService.ajouterPost = async (idAuthor,headers,formData) => {
    return await axios.post(`http://127.0.0.1:4000/Post/${idAuthor}/Ajouter`,formData, {headers })
}

PostService.getPostes = async (authorId) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${authorId}/Lister`, {headers })
}

PostService.getPostesByAuthor = async (authorId) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${authorId}/listerPostsByAuthor`)
}

PostService.getPostesByUser = async (authorId) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${authorId}/listerPostsByUser`)
}

PostService.getCommentsPost = async (postId) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${postId}/listCommentsPost`)
}

PostService.addCommentToPost = async (postId,comment) => {
    return await axios.post(`http://127.0.0.1:4000/Post/${postId}/addComment`,comment)
}

PostService.likeAndDisLike = async (postId,liker) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${postId}/likeAndDisLike/${liker}`,liker)
}

PostService.ifIsLikePost = async (postId,liker) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${postId}/ifIsLikePost/${liker}`,liker)
}

PostService.isAuthorPost = async (postId,authorId) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${postId}/isAuthorPost/${authorId}`,authorId)
}

PostService.updatePost = async (postId,Contentpost) => {
    return await axios.post(`http://127.0.0.1:4000/Post/${postId}/update`,Contentpost)
}

PostService.findPostById = async (postId) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${postId}/findPostById`)
}

PostService.deletePost = async (postId) => {
    return await axios.get(`http://127.0.0.1:4000/Post/${postId}/delete`)
}

export default PostService;