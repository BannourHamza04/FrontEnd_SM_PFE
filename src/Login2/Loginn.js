import React, { useRef } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Loginn() {

    const emailField = useRef()
    const passwordField = useRef()
    const navigate = useNavigate();
    const [_, setCookies] = useCookies(["access_token"])

    const ValidateForm = async () => {
        const email = emailField.current.value
        const password = passwordField.current.value
        let isFormValid = true

        // Function Email Validation
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
                const user = {
                    email: email,
                    password: password
                }

                const response = await UserService.login(user)
                if (response.status === 200) {
                    localStorage.setItem('user_data', JSON.stringify(response.data.sessUser))
                    localStorage.setItem('token', response.data.token)
                    setCookies("access_token", response.data.token)
                    toast.success(response.data);
                    navigate('/');
                }
                if (response.status === 202) {
                    toast.error(response.data);
                }
                if (response.status === 400) {
                    toast.error(response.data);
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
                                <h2 style={{ color: 'orange' }}>Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group-log">
                                        <label className='class-label' htmlFor="email">Email :</label>
                                        <input className='class-input' type="text" id="email" placeholder="Your Email" required ref={emailField} />
                                    </div>
                                    <div className="input-group-log">
                                        <label className='class-label' htmlFor="email">Password :</label>
                                        <input className='class-input' type="password" id="password" placeholder="Your password" required ref={passwordField} />
                                    </div>
                                    <div className="text-log"><Link to="/ResetPassword">Do you forget your Password?</Link></div>
                                    <input className='class-input input-submit-log' type="submit" value="Login" />
                                </form>
                                <Link to="/Register">
                                    <input className='class-input input-google-log ' type="submit" value="Register" />
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
