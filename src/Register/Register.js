import React, { useRef } from 'react'
import './Register.css'
import UserModel from '../Models/User'
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

    const [_, setCookies] = useCookies(["access_token"])
    const usernameField = useRef()
    const emailField = useRef()
    const passwordField = useRef()
    const navigate = useNavigate();

    const ValidateForm = async () => {
        const nameUser = usernameField.current.value
        const email = emailField.current.value
        const password = passwordField.current.value
        let isFormValid = true

        // Function Email Test
        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        if (password.length < 8) {
            toast.error('Password invalid, The Password must be at least 8 characters long ! ')
            isFormValid = false
        }

        if (!validateEmail(email)) {
            toast.error('Invalid email format ! ')
            isFormValid = false
        }

        if (isFormValid) {
            try {
                const newUser = new UserModel(nameUser, email, password)
                const response = await UserService.register(newUser)
                if (response.status === 200) {
                    localStorage.setItem('user_data', JSON.stringify(response.data.sessUser))
                    localStorage.setItem('token', response.data.token)
                    setCookies("access_token", response.data.token)
                    toast.success(response.data.message);
                    navigate('/AddProfil');
                }
                if (response.status === 201) {
                    toast.error(response.data);
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

    return (
        <>
            <div>
                <ToastContainer position='top-center' />
            </div>
            <div className='landing-Acc'>
                <div className="container-log">
                    <div className="landing-log">
                        <div className="form-container-log">
                            <div className="form-log">
                                <h2 style={{ color: 'orange' }}>Register</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group-log">
                                        <label className='class-label' htmlFor="Username">Username :</label>
                                        <input className='class-input' type="text" id="Username" placeholder="Your Username" required ref={usernameField} />
                                    </div>
                                    <div className="input-group-log">
                                        <label className='class-label' htmlFor="email">Email :</label>
                                        <input className='class-input' type="text" id="email" placeholder="Your Email" required ref={emailField} />
                                    </div>
                                    <div className="input-group-log">
                                        <label className='class-label' htmlFor="password">Password :</label>
                                        <input className='class-input' type="password" id="password" placeholder="Your password" required ref={passwordField} />
                                    </div>
                                    <input className='class-input input-submit-log' type="submit" value="Register" />
                                </form>
                                <Link to="/Login">
                                    <input className='class-input input-google-log ' type="submit" value="Login" />
                                </Link>
                            </div>
                        </div>
                        <div className="cover-log">
                            <div className="text-overlay-log">
                                <h2>Welcome to our visitors in our App!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
