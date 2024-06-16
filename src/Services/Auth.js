import axios from 'axios'
import Cookies from 'js-cookie';

const Auth = {}
const token  = localStorage.getItem('token')
const headers = {
    Authorization: `Bearer ${token}`
}

Auth.isAuthenticated = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:4000/protected-route', {
            headers: headers
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

Auth.logout = async () => {
    localStorage.removeItem('token');
}

export default Auth;