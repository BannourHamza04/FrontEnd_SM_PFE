import axios from 'axios'
const UserService = {}

UserService.register = async (data) => {
    return await axios.post('http://127.0.0.1:4000/User/Ajouter', data)
}

UserService.login = async (data) =>{
    return await axios.post('http://127.0.0.1:4000/User/login',data)
}

UserService.forgetPassword = async(data) => {
    return await axios.post('http://127.0.0.1:4000/User/forgetPassword',data)
}

UserService.resetPassword = async(data) => {
    return await axios.post('http://127.0.0.1:4000/User/reset-password',data)
}

export default UserService;
