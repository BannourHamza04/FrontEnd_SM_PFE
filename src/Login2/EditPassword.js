import React, { useRef } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditPassword() {

    const tokenField = useRef()
    const newPasswordField = useRef()
    const navigate = useNavigate();

    const ValidateForm = async () => {
        const token = tokenField.current.value
        const newPassword = newPasswordField.current.value
        let isFormValid = true

        if (newPassword.length < 8) {
            alert('Password invalid, The Password must be at least 8 characters long ! ')
            isFormValid = false
        }


        if (isFormValid) {
            try {
                const user = {
                    token: token,
                    newPassword: newPassword
                }

                const response = await UserService.resetPassword(user)
                if (response.status === 200) {
                    toast.success(response.data)
                    // navigate('/SessionTest');
                }
                else {
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
                                <h2 style={{ color: 'orange' }}>Edit Password</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group-log">
                                        <label className='class-label' htmlFor="email"> Verification Code:</label>
                                        <input className='class-input' type="text" id="email" placeholder="Your Token" required ref={tokenField} />
                                    </div>
                                    <div className="input-group-log">
                                        <label className='class-label' htmlFor="email">New Password :</label>
                                        <input className='class-input' type="password" id="password" placeholder="Your New Password" required ref={newPasswordField} />
                                    </div>
                                    <input className='class-input input-submit-log' type="submit" value="Update Password" />
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

