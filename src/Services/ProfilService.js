import axios from 'axios'
import Cookies from 'js-cookie';

const ProfilService = {}
const token  = localStorage.getItem('token')
const headers = {
    Authorization: `Bearer ${token}`
}

ProfilService.ajouterProfil = async (data) => {
    return await axios.post('http://127.0.0.1:4000/Profil/Ajouter', data)
}

ProfilService.updateProfil = async (data, idProfile) => {
    return await axios.post('http://127.0.0.1:4000/Profil/${idProfile}/update', data)
}

ProfilService.getProfilByAuthorId = async (idAuthorProfil, headers) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${idAuthorProfil}/getProfilByAuthorId`, { headers })
}

ProfilService.getProfilById = async (idProfil) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${idProfil}/getProfilById`)
}

ProfilService.getAllProfiles = async () => {
    return await axios.get('http://127.0.0.1:4000/Profil/Lister')
}

ProfilService.getProfilesExecProfAuthor = async (authorId) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${authorId}/getProfilesExecProfAuthor`)
}

ProfilService.followProfil = async (authorId, followingId) => {
    return await axios.post(`http://127.0.0.1:4000/Profil/${authorId}/addFollowing`, followingId)
}

ProfilService.unFollowProfil = async (authorId, followingId) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${authorId}/deleteFollowing`, followingId)
}

ProfilService.ifIsFollowing = async (authorId, followingId) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${authorId}/ifIsFollowing/${followingId}`)
}

ProfilService.follow = async (authorId, followingId) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${authorId}/addFollowing/${followingId}`)
}

ProfilService.unFollow = async (authorId, followingId) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${authorId}/deleteFollowing/${followingId}`)
}

ProfilService.getFollowingsByAuthor = async (authorId) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${authorId}/getFollowingsByAuthor`)
}

ProfilService.getFollowersByAuthor = async (authorId) => {
    return await axios.get(`http://127.0.0.1:4000/Profil/${authorId}/getFollowersByAuthor`)
}

export default ProfilService;
