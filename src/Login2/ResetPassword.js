import React, { useRef } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {

    const emailField = useRef()
    const navigate = useNavigate();

    const ValidateForm = async () => {
        const email = emailField.current.value
        let isFormValid = true

        // Function Email Validation
        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        if (!validateEmail(email)) {
            toast.error('Invalid email format ! ')
            isFormValid = false
        }

        if (isFormValid) {
            try {
                const user = {
                    email: email
                }
                const response = await UserService.forgetPassword(user)
                if (response.status === 201) {
                    toast.error(response.data)
                }
                if (response.status === 200) {
                    alert('A reset email has been sent.');
                    navigate('/EditPassword')
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
                                <h2 style={{ color: 'orange' }}>Reset Password</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group-log">
                                        <label className='class-label' htmlFor="email">Email :</label>
                                        <input className='class-input' type="text" id="email" placeholder="Your Email" required ref={emailField} />
                                    </div>
                                    <input className='class-input input-submit-log' type="submit" value="Send" />
                                </form>
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
